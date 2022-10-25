import { Button, Container, Grid, Title, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { motion } from "framer-motion";
import { showNotification } from "@mantine/notifications";

export default function Clicker({
  money,
  setMoney,
  moneyPerClick,
  setMoneyPerClick,
}) {
  const [play] = useSound("/sounds/moneyClick.mp3", { volume: 0.05 });

  return (
    <Container>
      <Grid justify={"center"} align="center">
        <Grid.Col span={3}>
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button
              variant="gradient"
              gradient={{ from: "orange", to: "indigo", deg: 105 }}
              size="xl"
              onClick={async () => {
                play();
                const response = await fetch("/api/click", { method: "POST" });
                if (!response.ok) {
                  if (response.status === 429) {
                    showNotification({
                      title: "Error",
                      message:
                        "You are clicking too fast. Are you using an autoclicker? ;)",
                      color: "red",
                    });
                  }
                  return;
                }
                const userStat = await response.json();
                setMoney(userStat.money);
                setMoneyPerClick(userStat.moneyPerClick);
              }}
            >
              Click me!
            </Button>
          </motion.div>
        </Grid.Col>
        <Grid.Col span={3}>
          <Title order={1}>{Math.round(money * 100) / 100} $</Title>
          <Text weight={500}>{moneyPerClick} $/click</Text>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
