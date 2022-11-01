import { Button, Card, Text } from "@mantine/core";
import Router from "next/router";

export default function CoinflipGameCard({ game }) {
  return (
    <Card>
      <Text>Bet: {game.bet}</Text>
      <Button
        onClick={async () => {
          const body = {
            id: game._id,
          };
          const response = await fetch("/api/casino/coinflip", {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
          });
          if (response.ok) {
            Router.push(`/casino/coinflip/${game._id}`);
          }
        }}
        disabled={game.status === "closed"}
      >
        Join
      </Button>
    </Card>
  );
}
