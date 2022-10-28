import { Card, Image, Text, Group, Badge, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import TrashIcon from "../icons/TrashIcon";

export default function UserOfferSkinCard({
  id,
  offeredAt,
  openedSkin,
  price,
  userId,
  deleteOffer,
}) {
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
        <Badge color={"yellow"}>{price} $</Badge>
      </Group>
      <Button
        mt={10}
        variant="light"
        fullWidth
        color={"red"}
        leftIcon={<TrashIcon size={14} />}
        onClick={async () => {
          const body = {
            id: id,
          };
          const response = await fetch("/api/marketplace", {
            method: "DELETE",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
          });
          if (response.ok) {
            deleteOffer(id);
            showNotification({
              title: "Success",
              message:
                "You successfully deleted the marketplace offer. Your skin is back in your inventory.",
              color: "green",
            });
          } else {
            showNotification({
              title: "Error",
              message: "Oops, something did not work as planned.",
              color: "red",
            });
          }
        }}
      >
        Delete offer
      </Button>
    </Card>
  );
}
