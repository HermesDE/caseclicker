import {
  Button,
  Card,
  Center,
  Container,
  Grid,
  Image,
  RingProgress,
  Text,
  Title,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import { useEffect } from "react";
import Link from "next/link";
import UpgradeIcon from "../icons/UpgradeIcon";
import TokensToSkins from "./TokensToSkins";

export default function CasinoOverview({
  money,
  toggleMoneyUpdate,
  tokens,
  setTokens,
}) {
  return (
    <Container fluid>
      <Grid align={"center"}>
        <Grid.Col xs={6}>
          <Text>Your current tokens: {Math.floor(tokens)}</Text>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col xs={12}>
          <TokensToSkins
            tokens={tokens}
            setTokens={setTokens}
            toggleMoneyUpdate={toggleMoneyUpdate}
          />
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
        <Grid.Col xs={12} sm={6} lg={4} xl={3}>
          <Link href={"/casino/coinflip"}>
            <Card
              sx={{ cursor: "pointer", height: 300 }}
              withBorder
              shadow={"md"}
            >
              <Center>
                <Title order={3}>Coinflip</Title>
              </Center>
              <Center mt={15}>
                <Image
                  alt="coinflip logo"
                  fit="contain"
                  height={170}
                  src={"/pictures/casino/coinflip/ctlogo.webp"}
                />
              </Center>
            </Card>
          </Link>
        </Grid.Col>
        <Grid.Col xs={12} sm={6} lg={4} xl={3}>
          <Link href={"/casino/upgrade"}>
            <Card
              sx={{ cursor: "pointer", height: 300 }}
              withBorder
              shadow={"md"}
            >
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
