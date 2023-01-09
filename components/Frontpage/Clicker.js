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
import url from "../../lib/wsUrl";

let socket;

export default function Clicker({
  money,
  setMoney,
  moneyPerClick,
  setMoneyPerClick,
}) {
  const [connected, setConnected] = useState(false);
  const [play] = useSound("/sounds/moneyClick.mp3", { volume: 0.05 });

  useEffect(() => {
    const initConnection = async () => {
      const response = await fetch("/api/auth/jwt");
      const token = await response.json();

      socket = io(url, {
        auth: { token: token },
      });
      console.log("io");
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
  }, [setMoney, setMoneyPerClick]);

  return (
    <Container>
      <Grid>
        <Grid.Col span={12}>
          <Center>
            <Title sx={{ fontSize: 20 }}>
              Case Clicker Online is a free csgo case opening simulation
            </Title>
          </Center>
        </Grid.Col>
      </Grid>
      <Grid mt={20} justify={"center"}>
        <Grid.Col span={12}>
          <Center>
            <Stack spacing={"xs"}>
              <Text weight={500} size={50}>
                {new Intl.NumberFormat("en", {
                  style: "currency",
                  currency: "USD",
                }).format(money)}
              </Text>
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
                  size={250}
                  color="#CCCC00"
                  onClick={async () => {
                    play();

                    if (socket) {
                      socket.emit("click");
                    }

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
