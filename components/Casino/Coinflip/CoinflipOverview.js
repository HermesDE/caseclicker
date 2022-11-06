import {
  Button,
  Center,
  Container,
  Grid,
  Input,
  Text,
  Title,
} from "@mantine/core";
import { useState, useEffect } from "react";
import CoinflipGameCard from "./CoinflipGameCard";
import Router from "next/router";
import { io } from "socket.io-client";
import { getSession } from "next-auth/react";
import url from "../../../lib/wsUrl";

let socket;

export default function CoinflipOverview({
  tokens,
  toggleMoneyUpdate,
  setTokens,
}) {
  const [connected, setConnected] = useState(false);
  const [id, setId] = useState(null);
  const [userSession, setUserSession] = useState(null);

  const [bet, setBet] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const [games, setGames] = useState([]);

  const [ready, setReady] = useState(false);

  const deleteGame = (id) => {
    socket.emit("deleteGame", id, userSession.userId);
  };
  const joinGame = (id) => {
    socket.emit("joinGame", id, userSession);
  };
  const createGame = (bet) => {
    socket.emit("createGame", { bet: bet });
  };

  useEffect(() => {
    const initConnection = async () => {
      const session = await getSession();
      setUserSession(session);

      const response = await fetch("/api/auth/jwt");
      const token = await response.json();

      socket = io(url + "/coinflip", { auth: { token } });
      socket.on("connect_error", (err) => {
        console.log(err.message);
      });
      socket.on("connect", () => {
        setConnected(true);
        setId(socket.id);

        socket.emit("games");
        socket.on("userstats", (data) => {
          setTokens(data.tokens);
        });
      });
      socket.on("games", (data) => {
        //all games
        setGames(data);
      });
    };
    initConnection();

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("connect_error");
        socket.off("games");
        socket.off("userstats");
      }
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("users", (data) => {
      console.log(data);
    });

    return () => socket.off("users");
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("deleteGame", (data) => {
      const newState = games.map((game) => {
        if (!game) return game;
        if (game.id === data.id) {
          return undefined;
        }
        return game;
      });
      setGames(newState);
    });

    return () => {
      socket.off("deleteGame");
    };
  }, [games]);

  useEffect(() => {
    if (!socket) return;

    socket.on("joinedGame", (data) => {
      const index = games.findIndex((game) => {
        if (game !== undefined) {
          return game.id == data.id;
        }
      });

      if (index >= 0) {
        let updatedGames = games;
        updatedGames[index] = data;
        setGames([...updatedGames]);
      }
    });
    return () => socket.off("joinedGame");
  }, [games]);

  //clear board if there are no open games
  useEffect(() => {
    if (games.length <= 1) return;
    if (games.every((val, i, arr) => val === arr[0])) {
      setGames([]);
    }
  }, [games]);

  useEffect(() => {
    if (!socket) return;
    socket.on("newGame", (data) => {
      let pushed = false;
      const newState = games.map((game) => {
        if (pushed) return game;
        if (!game) {
          pushed = true;
          return data;
        }
        return game;
      });
      if (pushed) {
        setGames(newState);
      } else {
        setGames((current) => [...current, data]);
      }
    });
    return () => {
      socket.off("newGame");
    };
  }, [games]);

  //disable new game button if user has 3 open games already
  useEffect(() => {
    if (games.length <= 0) {
      return;
    }

    if (
      games.filter((game) => game?.host?.id === userSession.userId).length >= 3
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [games, userSession]);

  useEffect(() => {
    if (!socket) return;

    console.log("userstats update", userSession);
    socket.emit("userstats", userSession.userId);

    return () => socket.off("userstats");
  }, [ready]);

  return connected ? (
    <Container fluid>
      <Grid>
        <Grid.Col span={12}>
          <Text weight={500}>{tokens} Tokens available</Text>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={12}>
          {connected && <p>Connected with id {id}</p>}
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={6}>
          <Input value={bet} onChange={(e) => setBet(e.target.value)} />
        </Grid.Col>
        <Grid.Col span={6}>
          <Button
            disabled={disabled}
            onClick={() => {
              createGame(bet);
            }}
          >
            Create Game
          </Button>
        </Grid.Col>
      </Grid>
      {games.length > 0 ? (
        <Grid>
          {games.map((game) => {
            return (
              <Grid.Col span={4} key={game?.id || Math.random()}>
                <CoinflipGameCard
                  game={game}
                  session={userSession}
                  deleteGame={deleteGame}
                  joinGame={joinGame}
                  tokens={tokens}
                  ready={ready}
                  setReady={setReady}
                />
              </Grid.Col>
            );
          })}
        </Grid>
      ) : (
        <Center mt={50}>
          <Title order={2}>No open coinflip games</Title>
        </Center>
      )}
    </Container>
  ) : (
    ""
  );
}
