import { Button, Container, Grid, Input, Title } from "@mantine/core";
import { useState, useEffect } from "react";
import CoinflipGameCard from "./CoinflipGameCard";
import Router from "next/router";

export default function CoinflipOverview({ tokens }) {
  const [games, setGames] = useState([]);
  const [openedGames, setOpenedGames] = useState([]);
  const [bet, setBet] = useState(1);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    setInvalid(Number.isNaN(+bet) || bet > tokens);
  }, [bet]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/casino/coinflip");
      if (response.ok) {
        setGames(await response.json());
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setOpenedGames(games.filter((game) => game.status === "open"));
  }, [games]);

  return (
    <Container fluid>
      <Grid>
        <Grid.Col span={3}>
          <Input
            invalid={invalid}
            value={bet}
            onChange={(e) => setBet(e.target.value)}
          ></Input>
        </Grid.Col>
        <Grid.Col span={3}>
          <Button
            disabled={invalid}
            color="orange"
            variant="outline"
            onClick={async () => {
              const body = {
                bet: bet,
              };
              const response = await fetch("/api/casino/coinflip", {
                method: "POST",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
              });
              if (response.ok) {
                const { gameId } = await response.json();
                Router.push(`/casino/coinflip/${gameId}`);
              }
            }}
          >
            Create coinflip game
          </Button>
        </Grid.Col>
      </Grid>
      {openedGames.length === 0 && (
        <Grid>
          <Grid.Col>
            <Title order={1}>No open coinflip games</Title>
          </Grid.Col>
        </Grid>
      )}
      {openedGames.length > 0 && (
        <Grid>
          {openedGames.map((game) => {
            return <CoinflipGameCard key={game._id} game={game} />;
          })}
        </Grid>
      )}
    </Container>
  );
}
