import { Card, Image, Group, Text, Badge, Button } from "@mantine/core";
import { closeAllModals } from "@mantine/modals";
import { useRef } from "react";
import useSound from "use-sound";
import { useMediaQuery } from "@mantine/hooks";

export default function UnboxedSkinCard({ skin }) {
  const sound = useRef();
  let color;
  const mobile = useMediaQuery("(max-width: 900px)");

  switch (skin.rarity) {
    case "Mil-Spec Grade":
      sound.current = "caseAwardRare.mp3";
      color = "blue";
      break;
    case "Restricted":
      sound.current = "caseAwardMythical.mp3";
      color = "violet";
      break;
    case "Classified":
      sound.current = "caseAwardLegendary.mp3";
      color = "grape";
      break;
    case "Covert":
      sound.current = "caseAwardAncient.mp3";
      color = "red";
      break;
    case "Extraordinary":
      sound.current = "caseAwardAncient.mp3";
      color = "red";
      break;

    default:
      break;
  }
  const [unboxedSkinSound] = useSound("/sounds/" + sound.current, {
    volume: 0.1,
  });

  unboxedSkinSound();
  return (
    <Card
      shadow={"sm"}
      p={"lg"}
      radius="md"
      withBorder
      sx={{
        borderColor: skin.statTrak
          ? "orange"
          : skin.knifeType !== null
          ? "purple"
          : skin.souvenir
          ? "yellow"
          : skin.type === "Gloves"
          ? "purple"
          : "dark.04",
      }}
    >
      <Card.Section>
        <Image
          alt={skin.name}
          src={
            "https://steamcommunity-a.akamaihd.net/economy/image/" +
            skin.iconUrl
          }
          height={mobile ? 100 : 200}
          fit="contain"
        />
      </Card.Section>
      <Group position="apart" mt="md">
        <Text color={"#" + skin.rarityColor} weight={500}>
          {skin.name}
        </Text>
        <Badge size="lg" color="orange" variant="light">
          {skin.price} $
        </Badge>
      </Group>
      <Text color={"dark.2"} size="xs">
        {skin.float}
      </Text>
      <Button
        variant="outline"
        color={color}
        fullWidth
        mt={20}
        onClick={() => closeAllModals()}
      >
        Thats pretty cool
      </Button>
    </Card>
  );
}
