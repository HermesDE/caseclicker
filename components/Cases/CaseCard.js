import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";

export default function CaseCard({
  id,
  name,
  iconUrl,
  price,
  rarity,
  rarityColor,
  toggleMoneyUpdate,
}) {
  return (
    <Card shadow={"sm"} p="lg" radius={"md"} withBorder>
      <Card.Section>
        <Image
          src={`/pictures/cases/${iconUrl}`}
          height={100}
          fit="contain"
        ></Image>
      </Card.Section>
      <Group position="apart" mt={"md"} mb="xs">
        <Text weight={500}>{name}</Text>
        <Badge color={"yellow"}>{price} $</Badge>
      </Group>
      <Button
        variant="light"
        color={"blue"}
        fullWidth
        mt={"md"}
        radius="md"
        onClick={async () => {
          const body = {
            id: id,
          };
          const response = await fetch("/api/buy/case", {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
          });
          toggleMoneyUpdate();
        }}
      >
        Buy and open
      </Button>
    </Card>
  );
}
