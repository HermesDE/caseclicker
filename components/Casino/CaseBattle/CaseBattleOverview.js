import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import url from "../../../lib/wsUrl";
import CasinoUserCount from "../CasinoUserCount";
import { io } from "socket.io-client";
import { Button, Container, Grid } from "@mantine/core";
import { closeAllModals, openModal } from "@mantine/modals";
import CreateCaseBattleModal from "./CreateCaseBattleModal";
import CaseBattleGameCard from "./CaseBattleGameCard";
import { useRouter } from "next/router";

let socket;

export default function CaseBattleOverview({
  money,
  toggleMoneyUpdate,
  userOpenedCases,
}) {
  const [connected, setConnected] = useState(false);
  const [userSession, setUserSession] = useState(null);
  const [games, setGames] = useState([]);

  const [userCount, setUserCount] = useState();

  const router = useRouter();

  useEffect(() => {
    const initConnection = async () => {
      const session = await getSession();
      setUserSession(session);

      const response = await fetch("/api/auth/jwt");
      const token = await response.json();

      socket = io(url + "/casebattle", { auth: { token } });
      socket.on("connect_error", (err) => {
        console.error(err.message);
      });
      socket.on("connect", () => {
        setConnected(true);

        socket.emit("games");
      });
      socket.on("games", (data) => {
        //all games
        setGames(data);
      });
      socket.on("newGame", (data) => {
        setGames((current) => [...current, data]);
      });
      socket.on("gameCreated", (gameId) => {
        router.push("/casino/casebattle/" + gameId);
        closeAllModals();
      });
      socket.on("usercount", (count) => {
        setUserCount(count);
        console.log("user count updated");
      });
    };
    initConnection();

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("connect_error");
        socket.off("games");
        socket.off("gameCreated");
        socket.off("usercount");
      }
    };
  }, []);

  const createCaseBattle = (
    teams,
    playerCount,
    isPrivate,
    battlePrice,
    cases
  ) => {
    socket.emit("createGame", {
      teams,
      playerCount,
      isPrivate,
      battlePrice,
      cases,
    });
  };

  return (
    <Container fluid>
      <Grid>
        <Grid.Col span={12}>
          <CasinoUserCount userCount={userCount} />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={12}>
          <Button
            onClick={() =>
              openModal({
                title: "Create Case Battle",
                children: (
                  <CreateCaseBattleModal
                    money={money}
                    userOpenedCases={userOpenedCases}
                    createCaseBattle={createCaseBattle}
                  />
                ),
                size: "xl",
              })
            }
          >
            Create Case Battle
          </Button>
        </Grid.Col>
      </Grid>
      <Grid>
        {games.map((game) => {
          return (
            <Grid.Col key={game.id} span={12}>
              <CaseBattleGameCard game={game} />
            </Grid.Col>
          );
        })}
      </Grid>
    </Container>
  );
}
