import {
  Button,
  Container,
  Grid,
  Title,
  Text,
  Center,
  Group,
  Stack,
  UnstyledButton,
} from "@mantine/core";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { motion } from "framer-motion";
import { showNotification } from "@mantine/notifications";
import DollarIcon from "../icons/DollarIcon";
import { getSession } from "next-auth/react";
import { io } from "socket.io-client";

let socket;

export default function Clicker({
  money,
  setMoney,
  moneyPerClick,
  setMoneyPerClick,
}) {
  const [connected, setConnected] = useState(false);
  const [userSession, setUserSession] = useState(null);
  const [play] = useSound("/sounds/moneyClick.mp3", { volume: 0.05 });

  useEffect(() => {
    const initConnection = async () => {
      const session = await getSession();
      setUserSession(session);
      socket = io("http://localhost:3001", { auth: session });
      socket.on("connect_error", (err) => {
        console.log(err.message);
      });
      socket.on("connect", () => {
        setConnected(true);
        socket.on("click", (data) => {
          setMoney(data.money);
          setMoneyPerClick(data.moneyPerClick);
        });
      });
      socket.on("blocked", (data) => {
        showNotification({
          title: "You are blocked",
          message: `You are blocked because you are clicking too fast.\nPlease wait another ${data}ms until your next click`,
          color: "red",
        });
      });
    };
    initConnection();

    if (socket) {
      return () => {
        socket.off("connect");
        socket.off("connect_error");
        socket.off("click");
      };
    }
  }, []);

  return (
    <Container>
      <Grid justify={"center"}>
        <Grid.Col span={12}>
          <Center>
            <Stack spacing={"xs"}>
              <Title order={1}>{Math.round(money * 100) / 100} $</Title>
              <Text weight={500}>{moneyPerClick} $/click</Text>
            </Stack>
          </Center>
        </Grid.Col>
      </Grid>
      <Grid justify={"center"} align="center">
        <Grid.Col span={12}>
          <Center>
            <motion.div whileTap={{ scale: 0.9 }}>
              <UnstyledButton>
                <DollarIcon
                  size={200}
                  color="#CCCC00"
                  onClick={async () => {
                    play();

                    socket.emit("click");

                    /* const response = await fetch("/api/click", {
                      method: "POST",
                    });
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
                    setMoneyPerClick(userStat.moneyPerClick); */
                  }}
                />
              </UnstyledButton>
            </motion.div>
          </Center>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
