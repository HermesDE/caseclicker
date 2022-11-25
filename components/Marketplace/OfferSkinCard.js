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
import { useMemo, useState, useEffect } from "react";
import dayjs from "dayjs";

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
  const [updateTime, setUpdateTime] = useState(false);
  const difference = useMemo(() => {
    const date1 = dayjs(offeredAt);
    let diff = date1.diff();
    let unit = "sec";
    diff = Math.abs(diff);
    diff /= 1000;
    if (diff > 60) {
      diff /= 60;
      unit = "min";
    } else {
      return [Math.floor(diff), unit];
    }
    if (diff * 60 >= 3600) {
      diff /= 60;
      unit = "h";
    } else {
      return [Math.floor(diff), unit];
    }
    if (diff > 24) {
      diff /= 24;
      unit =
        Math.floor(diff * 100) / 100 <= 2 ? (unit = "day") : (unit = "days");
    }

    return [Math.floor(diff), unit];
  }, [offeredAt, updateTime]);

  useEffect(() => {
    const interval = setTimeout(() => {
      setUpdateTime(!updateTime);
    }, 3000);
    return () => clearTimeout(interval);
  }, [updateTime]);

  return (
    <Card shadow={"sm"} p="lg" radius={"md"} withBorder>
      <Text color={"dark.2"} size="xs" sx={{ marginTop: -10 }}>
        {difference} old
      </Text>
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
