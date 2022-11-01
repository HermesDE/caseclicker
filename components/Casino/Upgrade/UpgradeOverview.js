import {
  Badge,
  Card,
  Center,
  Container,
  Grid,
  Group,
  Image,
  ScrollArea,
  Text,
  Button,
} from "@mantine/core";
import { useEffect, useState } from "react";
import UpgradeRing from "./UpgradeRing";

export default function UpgradeOverview() {
  const [userSkins, setUserSkins] = useState([]);
  const [upgradeSkins, setUpgradeSkins] = useState([]);
  const [pickedUserSkin, setPickedUserSkin] = useState(null);
  const [pickedUpgradeSkin, setPickedUpgradeSkin] = useState(null);

  const [chance, setChance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function fetchSkins() {
      const response = await fetch("/api/inventory?sort=price");
      if (response.ok) {
        setUserSkins(await response.json());
      }
    }
    fetchSkins();
  }, []);

  useEffect(() => {
    async function fetchSkins() {
      const body = {
        id: pickedUserSkin._id,
      };
      const response = await fetch("/api/casino/upgrade/skins", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        setUpgradeSkins(await response.json());
      }
    }
    if (pickedUserSkin) {
      setPickedUpgradeSkin(null);
      fetchSkins();
    }
  }, [pickedUserSkin]);

  useEffect(() => {
    if (pickedUserSkin && pickedUpgradeSkin) {
      const calculatedChance =
        (pickedUserSkin.price / pickedUpgradeSkin.price) * 100;
      setChance(Math.round(calculatedChance * 100) / 100);
    } else {
      setChance(null);
    }
  }, [pickedUpgradeSkin, pickedUserSkin]);

  return (
    <Container fluid>
      <Grid justify={"center"} align="center">
        <Grid.Col span={4}>
          <Card withBorder sx={{ height: 300 }}>
            {pickedUserSkin && (
              <>
                <Group position="right">
                  <Badge variant="filled" color={"dark"} size="lg">
                    {pickedUserSkin.price} $
                  </Badge>
                </Group>

                <Card.Section>
                  <Image
                    height={200}
                    fit="contain"
                    src={
                      "https://steamcommunity-a.akamaihd.net/economy/image/" +
                      pickedUserSkin.iconUrl
                    }
                  />
                </Card.Section>
                <Text>{pickedUserSkin.name.split("|").shift()}</Text>
                <Text>{pickedUserSkin.name.split("|").pop()}</Text>
              </>
            )}
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Center>
            <UpgradeRing result={result} chance={chance} />
          </Center>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card withBorder sx={{ height: 300 }}>
            {pickedUpgradeSkin && (
              <>
                <Group position="right">
                  <Badge variant="filled" color={"dark"} size="lg">
                    {pickedUpgradeSkin.price} $
                  </Badge>
                </Group>

                <Card.Section>
                  <Image
                    height={200}
                    fit="contain"
                    src={
                      "https://steamcommunity-a.akamaihd.net/economy/image/" +
                      pickedUpgradeSkin.iconUrl
                    }
                  />
                </Card.Section>
                <Text>{pickedUpgradeSkin.name.split("|").shift()}</Text>
                <Text>{pickedUpgradeSkin.name.split("|").pop()}</Text>
              </>
            )}
          </Card>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col offset={4} span={4}>
          <Center>
            <Button
              disabled={loading || !pickedUserSkin || !pickedUpgradeSkin}
              fullWidth
              variant="outline"
              size="lg"
              color={"gray"}
              onClick={async () => {
                setLoading(true);
                const body = {
                  userSkin: pickedUserSkin,
                  upgradeSkin: pickedUpgradeSkin,
                };
                const response = await fetch("/api/casino/upgrade", {
                  method: "POST",
                  body: JSON.stringify(body),
                  headers: { "Content-Type": "application/json" },
                });
                if (response.ok) {
                  setResult(await response.json());
                }
              }}
            >
              UPGRADE
            </Button>
          </Center>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={6}>
          <Container fluid>
            <Group position="apart">
              <Text>Your skins ({userSkins.length})</Text>
              {/* add filter posibilities */}
            </Group>
            {userSkins.length > 0 && (
              <ScrollArea style={{ height: 500 }} offsetScrollbars>
                <Grid>
                  {userSkins.map((skin) => {
                    const namePartOne = skin.name.split("|").shift();
                    let namePartTwo = skin.name.split("(").shift();
                    namePartTwo = namePartTwo.split("|").pop();
                    let exterior = skin.name.split("(").pop();
                    exterior = exterior.split(")").shift();
                    switch (exterior) {
                      case "Factory New":
                        exterior = "FN";
                        break;
                      case "Minimal Wear":
                        exterior = "MW";
                        break;
                      case "Field-Tested":
                        exterior = "FT";
                        break;
                      case "Well-Worn":
                        exterior = "WW";
                        break;
                      case "Battle-Scarred":
                        exterior = "BS";
                        break;
                      default:
                        exterior = "\u2605";
                        break;
                    }
                    return (
                      <Grid.Col key={skin._id} span={3}>
                        <Card
                          sx={{
                            borderColor:
                              pickedUserSkin === skin ? "green" : "dark",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            if (loading) return;
                            if (pickedUserSkin === skin) {
                              setPickedUserSkin(null);
                              return;
                            }
                            setPickedUserSkin(skin);
                          }}
                          withBorder
                        >
                          <Card.Section>
                            <Group position="apart">
                              <Badge
                                color={"dark"}
                                variant="filled"
                                sx={{ marginTop: 5, marginLeft: 5 }}
                              >
                                {exterior}
                              </Badge>
                              <Badge
                                color={"dark"}
                                variant="filled"
                                sx={{ marginTop: 5, marginRight: 5 }}
                              >
                                {skin.price} $
                              </Badge>
                            </Group>
                          </Card.Section>
                          <Card.Section>
                            <Image
                              fit="contain"
                              height={75}
                              src={
                                "https://steamcommunity-a.akamaihd.net/economy/image/" +
                                skin.iconUrl
                              }
                            />
                          </Card.Section>

                          <Text size={"xs"}>{namePartOne}</Text>
                          <Text size={"xs"}>{namePartTwo}</Text>
                        </Card>
                      </Grid.Col>
                    );
                  })}
                </Grid>
              </ScrollArea>
            )}
          </Container>
        </Grid.Col>
        <Grid.Col span={6}>
          <Container fluid>
            <Group position="apart">
              <Text>Upgrade skins ({upgradeSkins.length})</Text>
              {/* add filter posibilities */}
            </Group>
            {upgradeSkins.length > 0 && (
              <ScrollArea offsetScrollbars style={{ height: 500 }}>
                <Grid>
                  {upgradeSkins.map((skin) => {
                    const namePartOne = skin.name.split("|").shift();
                    let namePartTwo = skin.name.split("(").shift();
                    namePartTwo = namePartTwo.split("|").pop();
                    let exterior = skin.name.split("(").pop();
                    exterior = exterior.split(")").shift();
                    switch (exterior) {
                      case "Factory New":
                        exterior = "FN";
                        break;
                      case "Minimal Wear":
                        exterior = "MW";
                        break;
                      case "Field-Tested":
                        exterior = "FT";
                        break;
                      case "Well-Worn":
                        exterior = "WW";
                        break;
                      case "Battle-Scarred":
                        exterior = "BS";
                        break;
                      default:
                        exterior = "\u2605";
                        break;
                    }
                    return (
                      <Grid.Col key={skin._id} span={3}>
                        <Card
                          sx={{
                            borderColor:
                              pickedUpgradeSkin === skin ? "green" : "dark",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            if (loading) return;
                            if (pickedUpgradeSkin === skin) {
                              setPickedUpgradeSkin(null);
                              return;
                            }
                            setPickedUpgradeSkin(skin);
                          }}
                          withBorder
                        >
                          <Card.Section>
                            <Group position="apart">
                              <Badge
                                color={"dark"}
                                variant="filled"
                                sx={{ marginTop: 5, marginLeft: 5 }}
                              >
                                {exterior}
                              </Badge>
                              <Badge
                                color={"dark"}
                                variant="filled"
                                sx={{ marginTop: 5, marginRight: 5 }}
                              >
                                {skin.price} $
                              </Badge>
                            </Group>
                          </Card.Section>
                          <Card.Section>
                            <Image
                              fit="contain"
                              height={75}
                              src={
                                "https://steamcommunity-a.akamaihd.net/economy/image/" +
                                skin.iconUrl
                              }
                            />
                          </Card.Section>
                          <Text size={"xs"}>{namePartOne}</Text>
                          <Text size={"xs"}>{namePartTwo}</Text>
                        </Card>
                      </Grid.Col>
                    );
                  })}
                </Grid>
              </ScrollArea>
            )}
          </Container>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
