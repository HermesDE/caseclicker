import { Container, Grid, Input, Text, Button, FocusTrap } from "@mantine/core";
import { closeAllModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import DollarIcon from "../icons/DollarIcon";

export default function MarketplaceOfferModal({
  id,
  name,
  iconUrl,
  price,
  rarity,
  rarityColor,
  float,
  deleteSkin,
}) {
  const [customPrice, setCustomPrice] = useState(price);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    setInvalid(Number.isNaN(+customPrice));
  }, [customPrice]);

  return (
    <Container fluid>
      <Grid align={"flex-end"}>
        <Grid.Col>
          <Text weight={500} color={"#" + rarityColor}>
            {name}
          </Text>
          <Text size={"xs"}>({float})</Text>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col>
          <FocusTrap active>
            <Input
              data-autofocus
              invalid={invalid}
              icon={<DollarIcon />}
              label="Price"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
            />
          </FocusTrap>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col>
          <Button
            disabled={invalid || customPrice === ""}
            variant="outline"
            color={"red"}
            fullWidth
            onClick={async () => {
              const body = {
                skinId: id,
                price: customPrice,
              };
              const response = await fetch("/api/marketplace", {
                method: "POST",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
              });
              if (response.ok) {
                showNotification({
                  title: "Success",
                  message: "Your skin was successfully placed on the market",
                  color: "green",
                });
              } else {
                const data = await response.json();
                showNotification({
                  title: "Error",
                  message: `There was an error while placing your skin on the market\nError: ${data.error}`,
                  color: "red",
                });
              }
              deleteSkin(id);
              closeAllModals();
            }}
          >
            Place on market
          </Button>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
