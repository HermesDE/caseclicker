import { Card, Group, Badge, Image, Text, Center } from "@mantine/core";

export default function UpgradePickedSkin({ skin }) {
  return (
    <Card withBorder sx={{ height: 300 }}>
      {skin ? (
        <>
          <Group position="right">
            <Badge variant="filled" color={"dark"} size="lg">
              {skin.price} $
            </Badge>
          </Group>

          <Card.Section>
            <Image
              alt="picked user skin"
              height={200}
              fit="contain"
              src={
                "https://steamcommunity-a.akamaihd.net/economy/image/" +
                skin.iconUrl
              }
            />
          </Card.Section>
          <Text>{skin.name.split("|").shift()}</Text>
          <Text>{skin.name.split("|").pop()}</Text>
        </>
      ) : (
        <Center>
          <Text size={"lg"} weight={500}>
            Pick one skin from below
          </Text>
        </Center>
      )}
    </Card>
  );
}
