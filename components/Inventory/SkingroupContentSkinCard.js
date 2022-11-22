import { Grid, Card, Group, Badge, Text, Image } from "@mantine/core";
import { useEffect, useState } from "react";

export default function SkingroupContentSkinCard({ skin }) {
  const [exterior, setExterior] = useState("");

  useEffect(() => {
    switch (skin.exterior) {
      case "Factory New":
        setExterior("FN");
        break;
      case "Minimal Wear":
        setExterior("MW");
        break;
      case "Field-Tested":
        setExterior("FT");
        break;
      case "Well-Worn":
        setExterior("WW");
        break;
      case "Battle-Scarred":
        setExterior("BS");
        break;
      default:
        setExterior("\u2605");
        break;
    }
  }, [skin]);
  return (
    <Grid.Col xs={6} md={3}>
      <Card withBorder>
        <Group position="apart">
          <Badge
            sx={{ marginTop: -5 }}
            size="md"
            variant="filled"
            color={"dark"}
          >
            {exterior}
          </Badge>
          {skin.statTrak || skin.souvenir ? (
            <Badge
              sx={{ marginTop: -5 }}
              size="md"
              color={skin.statTrak ? "orange" : "yellow"}
              variant="filled"
            >
              {skin.statTrak ? "ST" : "S"}
            </Badge>
          ) : null}
        </Group>

        <Card.Section>
          <Image
            alt={skin.name}
            src={`https://steamcommunity-a.akamaihd.net/economy/image/${skin.iconUrl}`}
            height={100}
            fit="contain"
          ></Image>
        </Card.Section>
        <Badge size="md" fullWidth variant="filled" color={"dark"}>
          {skin.price} $
        </Badge>
      </Card>
    </Grid.Col>
  );
}
