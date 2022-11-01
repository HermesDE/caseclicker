import { Avatar, Card, Group, Text, UnstyledButton } from "@mantine/core";
import { useState, useEffect } from "react";

export default function PlayerGuestCard({ guest, bet, status, winner }) {
  const [backgroundColor, setBackgroundColor] = useState();
  useEffect(() => {
    if (status === "closed") {
      setBackgroundColor(winner === "guest" ? "green" : "red");
    }
  }, []);
  return (
    <>
      {guest ? (
        <Card sx={{ backgroundColor: backgroundColor }}>
          <Avatar src={guest?.picture}></Avatar>
          <Text>{guest?.name}</Text>
          <Text>{bet} Tokens</Text>
        </Card>
      ) : (
        <Text>Waiting for player</Text>
      )}
    </>
  );
}
