import {
  Button,
  Card,
  Center,
  Container,
  Grid,
  RingProgress,
  Text,
  Title,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import { useEffect } from "react";
import MoneyToTokensModal from "./MoneyToTokensModal";
import Link from "next/link";
import UpgradeIcon from "../icons/UpgradeIcon";

export default function CasinoOverview({ money, toggleMoneyUpdate, tokens }) {
  return (
    <Container fluid>
      <Grid align={"center"}>
        <Grid.Col span={3}>
          <Text>Your current tokens: {tokens}</Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Button
            onClick={() =>
              openModal({
                title: "Convert money to tokens",
                children: (
                  <MoneyToTokensModal
                    money={money}
                    toggleMoneyUpdate={toggleMoneyUpdate}
                  />
                ),
                size: "xl",
              })
            }
            color={"orange"}
            variant="outline"
            fullWidth
          >
            Convert money to tokens
          </Button>
        </Grid.Col>
      </Grid>
      <Grid mt={50}>
        <Grid.Col span={12}>
          <Center>
            <Title order={1}>Casino Games</Title>
          </Center>
        </Grid.Col>
      </Grid>
      <Grid mt={20}>
        {/* <Grid.Col>
          <a href="/casino/coinflip">Coinflip</a>
        </Grid.Col> */}
        <Grid.Col span={4}>
          <Link href={"/casino/upgrade"}>
            <Card sx={{ cursor: "pointer" }} withBorder shadow={"md"}>
              <Center>
                <UpgradeIcon size={24} />
                <Title order={3}>Upgrade</Title>
              </Center>
              <Center>
                <RingProgress
                  label={
                    <Center>
                      <Text>Upgrade your skins</Text>
                    </Center>
                  }
                  size={200}
                  sections={[
                    { value: 50, color: "green" },
                    { value: 50, color: "red" },
                  ]}
                />
              </Center>
            </Card>
          </Link>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
