import { Container, Grid, Input, FocusTrap, Text, Button } from "@mantine/core";
import { closeAllModals } from "@mantine/modals";
import { useState, useEffect } from "react";

export default function MoneyToTokensModal({ money, toggleMoneyUpdate }) {
  const [tokens, setTokens] = useState();
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    setInvalid(Number.isNaN(+tokens) || tokens > money * 10);
  }, [tokens, money]);

  return (
    <Container fluid>
      {tokens > money * 10 && <Text>You dont have enough money</Text>}
      <Grid>
        <Grid.Col span={3}>
          <Text size={"sm"}>Tokens to be converted</Text>
        </Grid.Col>
      </Grid>
      <Grid align={"center"}>
        <Grid.Col span={3}>
          <FocusTrap active>
            <Input
              data-autofocus
              invalid={invalid}
              //icon={<DollarIcon />}
              label="Tokens to be converted"
              value={tokens}
              onChange={(e) => setTokens(e.target.value)}
            />
          </FocusTrap>
        </Grid.Col>
        <Grid.Col span={3}>
          <Text>Tokens = {tokens / 10} Dollar</Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Button
            disabled={invalid}
            color="orange"
            onClick={async () => {
              const body = {
                tokens: tokens,
              };
              const response = await fetch("/api/casino/moneyToTokens", {
                method: "POST",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
              });
              toggleMoneyUpdate();
              closeAllModals();
            }}
          >
            Convert
          </Button>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
