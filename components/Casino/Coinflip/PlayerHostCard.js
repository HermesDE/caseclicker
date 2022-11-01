import { Avatar, Card, Group, Text, UnstyledButton } from "@mantine/core";
import { useEffect, useState } from "react";

export default function PlayerCard({ host, bet, status, winner }) {
  const [backgroundColor, setBackgroundColor] = useState();
  useEffect(() => {
    if (status === "closed") {
      setBackgroundColor(winner === "host" ? "green" : "red");
    }
  }, []);

  return (
    <>
      {host && (
        <Card sx={{ backgroundColor: backgroundColor }}>
          <Avatar src={host?.picture}></Avatar>
          <Text>{host?.name}</Text>
          <Text>{bet} Tokens</Text>
        </Card>
      )}
    </>
  );
}
