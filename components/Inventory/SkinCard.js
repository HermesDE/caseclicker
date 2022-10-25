import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  Text,
  Transition,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { motion } from "framer-motion";

export default function SkinCard({
  id,
  name,
  iconUrl,
  price,
  rarity,
  rarityColor,
  float,
  deleteSkin,
  toggleMoneyUpdate,
  sellLock,
}) {
  return (
    <motion.div>
      <Card shadow={"sm"} p="lg" radius={"md"} withBorder>
        <Card.Section>
          <Image
            src={`https://steamcommunity-a.akamaihd.net/economy/image/${iconUrl}`}
            height={100}
            fit="contain"
          ></Image>
        </Card.Section>
        <Group position="apart" mt={"md"}>
          <Text weight={500} color={"#" + rarityColor}>
            {name}
          </Text>
          <Badge color={"yellow"}>{price} $</Badge>
        </Group>
        <Text color={"dark.2"} size="xs">
          {float}
        </Text>
        <Button
          variant="light"
          color={"red"}
          fullWidth
          mt={"md"}
          radius="md"
          disabled={sellLock}
          onClick={async () => {
            const body = {
              id: id,
            };
            const response = await fetch("/api/inventory", {
              method: "DELETE",
              body: JSON.stringify(body),
              headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
              deleteSkin(id);
              toggleMoneyUpdate();
              showNotification({
                title: "Item sold!",
                message: `You sold your ${name} for ${price} $.`,
                color: "green",
              });
            } else {
              showNotification({
                title: "Oops",
                message: "Something went wrong while selling your skin",
                color: "red",
              });
            }
          }}
        >
          Sell for {price} $
        </Button>
      </Card>
    </motion.div>
  );
}
