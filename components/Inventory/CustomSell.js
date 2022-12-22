import { Button, Container, Grid, Input, Select, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useState, useEffect } from "react";
import DollarIcon from "../icons/DollarIcon";
import TokensIcon from "../icons/TokensIcon";

export default function CustomSell({ toggleMoneyUpdate }) {
  const [loading, setLoading] = useState(false);
  const [rarity, setRarity] = useState("");

  const [price, setPrice] = useState(1);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    setInvalid(Number.isNaN(+price));
  }, [price]);

  const handleByRarity = async (currency) => {
    setLoading(true);
    const body = { type: "rarity", value: rarity, currency };
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
          {currency === "money"
            ? `Do you really want to sell all ${data.count} ${rarity} skins for ${data.cost}$ ?`
            : `Do you really want to convert all ${data.count} ${rarity} skins for ${data.cost} tokens?`}
        </Text>
      ),
      labels: {
        confirm:
          currency === "money"
            ? `Sell for ${data.cost}$`
            : `Convert to ${data.cost} tokens`,
        cancel: "Cancel",
      },
      onConfirm: async () => {
        const body = { type: "rarity", value: rarity, currency };
        const response = await fetch("/api/inventory", {
          method: "DELETE",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          showNotification({
            title: "Success",
            message:
              currency === "money"
                ? `You sold all your ${data.count} ${rarity} skins for ${data.cost}$`
                : `You converted all your ${data.count} ${rarity} skins for ${data.cost} tokens`,
            color: "green",
          });
        } else {
          showNotification({
            title: "Error",
            message: "Error while selling / converting your skins",
            color: "red",
          });
        }
        toggleMoneyUpdate();
        setLoading(false);
      },
      onCancel: () => setLoading(false),
    });
  };
  const handleByPrice = async (currency) => {
    setLoading(true);
    const body = { type: "price", value: price, currency };
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
          {currency === "money"
            ? `Do you really want to sell all ${data.count} skins under ${price}$ for ${data.cost}$ ?`
            : `Do you really want to convert all ${data.count} skins under ${price}$ for ${data.cost} tokens?`}
        </Text>
      ),
      labels: {
        confirm:
          currency === "money"
            ? `Sell for ${data.cost}$`
            : `Convert to ${data.cost} tokens`,
        cancel: "Cancel",
      },
      onConfirm: async () => {
        const body = { type: "price", value: price, currency };
        const response = await fetch("/api/inventory", {
          method: "DELETE",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          showNotification({
            title: "Success",
            message:
              currency === "money"
                ? `You sold all your ${data.count} skins below ${price} for ${data.cost}$`
                : `You converted all your ${data.count} skins below ${price} for ${data.cost} tokens.`,
            color: "green",
          });
        } else {
          showNotification({
            title: "Error",
            message: "Error while selling / converting your skins",
            color: "red",
          });
        }
        toggleMoneyUpdate();
        setLoading(false);
      },
      onCancel: () => setLoading(false),
    });
  };

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
              "Consumer Grade",
              "Industrial Grade",
              "Mil-Spec Grade",
              "Restricted",
              "Classified",
              "Covert",
            ]}
          ></Select>
        </Grid.Col>
        <Grid.Col span={2} sm={1}>
          <Text>skins</Text>
        </Grid.Col>
        <Grid.Col span={"content"}>
          <Button
            leftIcon={<DollarIcon size={16} />}
            loading={loading}
            color={"red"}
            disabled={!rarity || loading}
            variant="outline"
            onClick={async () => await handleByRarity("money")}
          >
            Sell
          </Button>
        </Grid.Col>
        <Grid.Col span={"content"}>
          <Button
            leftIcon={<TokensIcon size={16} />}
            loading={loading}
            color={"yellow"}
            disabled={!rarity || loading}
            variant="outline"
            onClick={async () => await handleByRarity("tokens")}
          >
            Convert
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
        <Grid.Col span={"content"} offsetMd={1}>
          <Button
            leftIcon={<DollarIcon size={16} />}
            loading={loading}
            color={"red"}
            disabled={!price || loading || invalid}
            variant="outline"
            onClick={async () => await handleByPrice("money")}
          >
            Sell
          </Button>
        </Grid.Col>
        <Grid.Col span={"content"}>
          <Button
            leftIcon={<TokensIcon size={16} />}
            loading={loading}
            color={"yellow"}
            disabled={!price || loading || invalid}
            variant="outline"
            onClick={async () => await handleByPrice("tokens")}
          >
            Convert
          </Button>
        </Grid.Col>
      </Grid>
    </>
  );
}
