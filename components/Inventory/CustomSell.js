import { Button, Container, Grid, Select, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";

export default function CustomSell({ toggleMoneyUpdate }) {
  const [loading, setLoading] = useState(false);
  const [rarity, setRarity] = useState("");

  return (
    <Container fluid>
      <Grid>
        <Text>Sell by rarity</Text>
      </Grid>
      <Grid align={"center"} justify={"left"}>
        <Grid.Col span={1}>
          <Text>All</Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Select
            value={rarity}
            onChange={setRarity}
            data={[
              "Common",
              "Uncommon",
              "Mil-Spec Grade",
              "Restricted",
              "Classified",
              "Covert",
            ]}
          ></Select>
        </Grid.Col>
        <Grid.Col span={1}>
          <Text>skins</Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Button
            loading={loading}
            color={"red"}
            disabled={!rarity || loading}
            variant="outline"
            onClick={async () => {
              setLoading(true);
              const body = { type: "rarity", value: rarity };
              const response = await fetch("/api/inventory", {
                method: "PATCH",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
              });
              const data = await response.json();

              if (data.count === 0) {
                showNotification({
                  title: "Error",
                  message: "You have no skins with this rarity",
                  color: "red",
                });
                setLoading(false);
                return;
              }
              openConfirmModal({
                title: "Are you sure?",
                children: (
                  <Text>
                    Do you really want to sell all {data.count} {rarity} skins
                    for {data.cost}$ ?
                  </Text>
                ),
                labels: {
                  confirm: `Sell for ${data.cost}$`,
                  cancel: "Cancel",
                },
                onConfirm: async () => {
                  const body = { type: "rarity", value: rarity };
                  const response = await fetch("/api/inventory", {
                    method: "DELETE",
                    body: JSON.stringify(body),
                    headers: { "Content-Type": "application/json" },
                  });
                  if (response.ok) {
                    showNotification({
                      title: "Success",
                      message: `You sold all your ${data.count} ${rarity} skins for ${data.cost}$`,
                      color: "green",
                    });
                  } else {
                    showNotification({
                      title: "Error",
                      message: "Error while selling your skins",
                      color: "red",
                    });
                  }
                  toggleMoneyUpdate();
                  setLoading(false);
                },
                onCancel: () => setLoading(false),
              });
            }}
          >
            Sell
          </Button>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
