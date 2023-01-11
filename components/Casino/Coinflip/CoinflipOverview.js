import {
  Button,
  Center,
  Container,
  Divider,
  Grid,
  Input,
  NumberInput,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import { useState, useEffect, useCallback } from "react";
import CoinflipGameCard from "./CoinflipGameCard";
import { io } from "socket.io-client";
import { getSession } from "next-auth/react";
import url from "../../../lib/wsUrl";
import TokensIcon from "../../icons/TokensIcon";
import CasinoUserCount from "../CasinoUserCount";

let socket;

export default function CoinflipOverview({
  tokens,
  toggleMoneyUpdate,
  setTokens,
}) {
  const [connected, setConnected] = useState(false);
  const [id, setId] = useState(null);
  const [userSession, setUserSession] = useState(null);

  const [bet, setBet] = useState(1);
  const [disabled, setDisabled] = useState(false);

  const [games, setGames] = useState([]);
  const [userCount, setUserCount] = useState();

  const deleteGame = (id) => {
    socket.emit("deleteGame", id, userSession.userId);
  };
  const joinGame = (id, bot) => {
    socket.emit("joinGame", id, bot, userSession);
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
        console.error(err.message);
      });
      socket.on("connect", () => {
        setConnected(true);
        setId(socket.id);

        socket.emit("games");
      });
      socket.on("disconnect", () => {
        setConnected(false);
        setId(null);
      });
      socket.on("games", (data) => {
        //all games
        setGames(data);
      });
      socket.on("userstats", (data) => {
        setTokens(data.tokens);
      });
      socket.on("usercount", (count) => {
        setUserCount(count);
      });
    };
    initConnection();

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("connect_error");
        socket.off("games");
        socket.off("userstats");
        socket.off("usercount");
      }
    };
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
    if (
      games.filter((game) => game?.host?.id === userSession?.userId).length >=
        3 ||
      tokens < bet
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [games, userSession, bet, tokens]);

  const toggleUserStats = useCallback(() => {
    if (!socket) return;
    socket.emit("userstats", userSession?.userId);
  }, [userSession]);

  return connected ? (
    <Container fluid>
      <Grid>
        <Grid.Col span={12}>
          <CasinoUserCount userCount={userCount} />
          <Grid mt={10}>
            <Grid.Col span={"content"}>
              <TokensIcon color={"yellow"} size={24} />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Text weight={500}>{Math.floor(tokens)}</Text>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col xs={6} sm={3}>
              <NumberInput
                icon={<TokensIcon color={"yellow"} />}
                value={bet}
                onChange={(value) => {
                  if (isNaN(value)) return;
                  const regex = new RegExp("^[0-9]*$");
                  if (!regex.exec(value)) return;
                  setBet(value);
                }}
                min={1}
                max={tokens}
                stepHoldDelay={500}
                stepHoldInterval={50}
              />
            </Grid.Col>
            <Grid.Col xs={6} sm={3}>
              <Button
                color={"yellow"}
                variant="outline"
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
            <Grid mt={20}>
              {games.map((game) => {
                return (
                  <Grid.Col
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    xl={4}
                    key={game?.id || Math.random()}
                  >
                    <CoinflipGameCard
                      game={game}
                      session={userSession}
                      deleteGame={deleteGame}
                      joinGame={joinGame}
                      tokens={tokens}
                      toggleUserStats={toggleUserStats}
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
        </Grid.Col>
      </Grid>
    </Container>
  ) : (
    ""
  );
}
