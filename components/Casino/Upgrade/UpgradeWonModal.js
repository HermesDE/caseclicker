import {
  Badge,
  Button,
  Card,
  Center,
  Container,
  Grid,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { closeAllModals } from "@mantine/modals";
import { useRef } from "react";
import useSound from "use-sound";

export default function UpgradeWonModal({ skin }) {
  const sound = useRef();
  let color;

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
    <Container>
      <Grid>
        <Grid.Col span={12}>
          <Card>
            <Center>
              <Title>You won!</Title>
            </Center>
            <Card.Section>
              <Image
                fit="contain"
                height={200}
                alt={skin.name}
                src={
                  "https://steamcommunity-a.akamaihd.net/economy/image/" +
                  skin.iconUrl
                }
              />
            </Card.Section>
            <Group mb={20} position="apart">
              <Text weight={500}>{skin.name}</Text>
              <Badge size="xl" color={"dark"} variant="filled">
                {skin.price} $
              </Badge>
            </Group>
            <Button
              onClick={closeAllModals}
              fullWidth
              variant="outline"
              color={"yellow"}
            >
              Nice
            </Button>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
