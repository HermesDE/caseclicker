import { Badge, Card, Divider, Group, Image, Text } from "@mantine/core";
import ArrowRightIcon from "../icons/ArrowRightIcon";

export default function CustomCaseContentSkinCard({ skin }) {
  return (
    <Card withBorder /* sx={{ borderColor: `#${skin.rarityColor}` }} */>
      <Card.Section>
        <Image
          alt={skin.name}
          src={`https://steamcommunity-a.akamaihd.net/economy/image/${skin.iconUrl}`}
          height={100}
          fit="contain"
        />
      </Card.Section>
      <Text weight={500} color={`#${skin.rarityColor}`}>
        {skin.name.split("|").shift()}
      </Text>
      <Text weight={500} color={`#${skin.rarityColor}`}>
        {skin.name.split("|").pop()}
      </Text>
      <Group mt={5} position="apart">
        <Badge variant="filled" color={"dark"}>
          {skin.minPrice} $
        </Badge>
        <ArrowRightIcon size={20} />
        <Badge variant="filled" color={"dark"}>
          {skin.maxPrice} $
        </Badge>
      </Group>
      <Badge mt={10} fullWidth variant="filled" color={"dark"}>
        {skin.percentage}%
      </Badge>
    </Card>
  );
}
