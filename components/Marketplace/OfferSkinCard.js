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

export default function OfferSkinCard({ id, price, openedSkin, offeredAt }) {
  return (
    <Card sx={{ height: 275 }} shadow={"sm"} p="lg" radius={"md"} withBorder>
      <Card.Section>
        <Image
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
        onClick={async () => {
          const body = {
            id: id,
          };
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
          }
        }}
      >
        Buy for {price} $
      </Button>
    </Card>
  );
}
