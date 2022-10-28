import {
  Card,
  Image,
  Text,
  Group,
  Button,
  Badge,
  Tooltip,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";

export default function OfferSkinCard({
  id,
  price,
  openedSkin,
  offeredAt,
  toggleMoneyUpdate,
  deleteOffer,
  money,
}) {
  const [loading, setLoading] = useState(false);
  return (
    <Card shadow={"sm"} p="lg" radius={"md"} withBorder>
      <Card.Section>
        <Image
          alt={openedSkin.name}
          src={`https://steamcommunity-a.akamaihd.net/economy/image/${openedSkin.iconUrl}`}
          height={100}
          fit="contain"
        ></Image>
      </Card.Section>

      <Text weight={500} color={"#" + openedSkin.rarityColor}>
        {openedSkin.name.split("|").shift()}
      </Text>
      <Text weight={500} color={"#" + openedSkin.rarityColor}>
        {openedSkin.name.split("|").pop()}
      </Text>

      <Group position="apart" mt={"md"}>
        <Text color={"dark.2"} size="xs">
          {openedSkin.float}
        </Text>
        <Group position="right">
          <Tooltip withArrow label="Ingame price">
            <Badge color={"dark"}>
              <Text strikethrough>{openedSkin.price} $</Text>
            </Badge>
          </Tooltip>
          <Tooltip withArrow label="Marketplace price">
            <Badge variant="dot" color={"yellow"}>
              {price} $
            </Badge>
          </Tooltip>
        </Group>
      </Group>

      <Button
        mt={"lg"}
        color="red"
        variant="light"
        fullWidth
        loading={loading}
        disabled={loading || money < price}
        onClick={async () => {
          const body = {
            id: id,
          };
          setLoading(true);
          const response = await fetch("/api/buy/marketplaceSkin", {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
          });
          if (response.ok) {
            showNotification({
              title: "Success",
              message: "You successfully bought the skin",
              color: "green",
            });
            deleteOffer(id);
          } else {
            let message;
            if (response.status === 404) {
              message = "This skin is no longer available.";
            } else {
              message = "There was an error buying this skin.";
            }
            showNotification({
              title: "Error",
              message: message,
              color: "red",
            });
          }
          setLoading(false);
          toggleMoneyUpdate();
        }}
      >
        {money < price ? "Not enough money" : `Buy for ${price} $`}
      </Button>
    </Card>
  );
}
