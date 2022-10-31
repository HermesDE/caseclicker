import { Button, Container, Grid, Text, Title } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { useEffect } from "react";
import MoneyToTokensModal from "./MoneyToTokensModal";

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
          <Title order={1}>Casino Games</Title>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
