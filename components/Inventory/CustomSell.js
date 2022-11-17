import { Button, Container, Grid, Input, Select, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useState, useEffect } from "react";
import DollarIcon from "../icons/DollarIcon";

export default function CustomSell({ toggleMoneyUpdate }) {
  const [loading, setLoading] = useState(false);
  const [rarity, setRarity] = useState("");

  const [price, setPrice] = useState(1);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    setInvalid(Number.isNaN(+price));
  }, [price]);

  return (
    <>
      <Text weight={500} underline>
        Sell by rarity
      </Text>

      <Grid align={"center"}>
        <Grid.Col span={2} sm={1} md={3}>
          <Text>All</Text>
        </Grid.Col>
        <Grid.Col span={4} sm={3}>
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
        <Grid.Col span={3} sm={1}>
          <Text>skins</Text>
        </Grid.Col>
        <Grid.Col span={3} sm={3}>
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
      <Text underline weight={500} mt={10}>
        Sell by price
      </Text>
      <Grid align={"center"}>
        <Grid.Col span={5} xs={3}>
          <Text>All skins under</Text>
        </Grid.Col>
        <Grid.Col span={4} xs={2} md={3}>
          <Input
            invalid={invalid}
            icon={<DollarIcon />}
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Grid.Col>
        <Grid.Col span={3} xs={4} offsetMd={1}>
          <Button
            loading={loading}
            color={"red"}
            disabled={!price || loading || invalid}
            variant="outline"
            onClick={async () => {
              setLoading(true);
              const body = { type: "price", value: price };
              const response = await fetch("/api/inventory", {
                method: "PATCH",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
              });
              const data = await response.json();

              if (data.count === 0) {
                showNotification({
                  title: "Error",
                  message: "You have no skins below this price",
                  color: "red",
                });
                setLoading(false);
                return;
              }
              openConfirmModal({
                title: "Are you sure?",
                children: (
                  <Text>
                    Do you really want to sell all {data.count} skins under{" "}
                    {price}$ for {data.cost}$ ?
                  </Text>
                ),
                labels: {
                  confirm: `Sell for ${data.cost}$`,
                  cancel: "Cancel",
                },
                onConfirm: async () => {
                  const body = { type: "price", value: price };
                  const response = await fetch("/api/inventory", {
                    method: "DELETE",
                    body: JSON.stringify(body),
                    headers: { "Content-Type": "application/json" },
                  });
                  if (response.ok) {
                    showNotification({
                      title: "Success",
                      message: `You sold all your ${data.count} skins below ${price} for ${data.cost}$`,
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
    </>
  );
}
