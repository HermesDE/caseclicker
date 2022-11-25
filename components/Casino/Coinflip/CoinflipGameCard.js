import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Center,
  Grid,
  Group,
  Paper,
  Text,
  Tooltip,
} from "@mantine/core";
import { useState } from "react";
import TokensIcon from "../../icons/TokensIcon";
import TrashIcon from "../../icons/TrashIcon";
import CoinflipCoin from "./CoinflipCoin";
import BotIcon from "../../icons/BotIcon";

export default function CoinflipGameCard({
  game,
  session,
  deleteGame,
  joinGame,
  tokens,
  toggleUserStats,
}) {
  const [animationEnded, setAnimationEnded] = useState(false);
  return game === undefined ? (
    <Card sx={{ minHeight: 200 }} withBorder></Card>
  ) : (
    <Card sx={{ minHeight: 200 }} withBorder>
      <Grid>
        <Grid.Col span={4} mt={5}>
          <Paper withBorder p={20}>
            <Center>
              <Avatar src={game.host.image} alt="game host image" />
            </Center>
            <Center>
              <Text>{game.host.name}</Text>
            </Center>
            <Center>
              <TokensIcon size={16} color="yellow" />
              {animationEnded ? (
                <Text
                  ml={2}
                  weight={500}
                  color={game.winner === "host" ? "green" : "red"}
                >
                  {game.winner === "host" ? game.bet * 2 : -game.bet}
                </Text>
              ) : (
                <Text ml={2} weight={500}>
                  {game.bet}
                </Text>
              )}
            </Center>
          </Paper>
        </Grid.Col>
        <Grid.Col span={4} mt={30}>
          {game.status === "waiting" && (
            <Center>
              <Text>VS</Text>
            </Center>
          )}
          {game.host.id === session.userId && game.status === "waiting" && (
            <>
              <Center>
                <ActionIcon
                  color={"red"}
                  variant="filled"
                  onClick={() => deleteGame(game.id)}
                >
                  <TrashIcon size={20} />
                </ActionIcon>
              </Center>
            </>
          )}
          {game.status === "full" && game.winner && (
            <Center>
              <CoinflipCoin
                gameId={game.id}
                host={game.host}
                guest={game.guest}
                winner={game.winner}
                setAnimationEnded={setAnimationEnded}
                toggleUserStats={toggleUserStats}
              />
            </Center>
          )}
        </Grid.Col>
        <Grid.Col span={4} mt={5}>
          {game.guest ? (
            <>
              <Paper withBorder p={20}>
                <Center>
                  <Avatar src={game.guest.image} alt="game guest image" />
                </Center>
                <Center>
                  <Text>{game.guest.name}</Text>
                </Center>
                <Center>
                  <TokensIcon size={16} color="yellow" />
                  {animationEnded ? (
                    <Text
                      ml={2}
                      weight={500}
                      color={game.winner === "guest" ? "green" : "red"}
                    >
                      {game.winner === "guest" ? game.bet * 2 : -game.bet}
                    </Text>
                  ) : (
                    <Text ml={2} weight={500}>
                      {game.bet}
                    </Text>
                  )}
                </Center>
              </Paper>
            </>
          ) : game.host.id === session.userId ? (
            <>
              <Center mt={30}>
                <Text>Waiting for player</Text>
              </Center>
              <Center>
                <Tooltip label="Play with bot" position="bottom">
                  <ActionIcon
                    variant="filled"
                    color={"yellow"}
                    onClick={() => {
                      joinGame(game.id, true);
                    }}
                  >
                    <BotIcon size={20} />
                  </ActionIcon>
                </Tooltip>
              </Center>
            </>
          ) : (
            <Center mt={30}>
              <Button
                disabled={tokens < game.bet}
                color={"yellow"}
                onClick={() => joinGame(game.id, false)}
              >
                Join for
                <TokensIcon color={"yellow"} size={16} />
                {game.bet}
              </Button>
            </Center>
          )}
        </Grid.Col>
      </Grid>
    </Card>
  );
}
