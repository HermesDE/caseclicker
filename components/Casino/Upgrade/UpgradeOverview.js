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
  Input,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useEffect, useMemo, useRef, useState } from "react";
import DollarIcon from "../../icons/DollarIcon";
import UpgradeRing from "./UpgradeRing";
import UpgradeWonModal from "./UpgradeWonModal";
import { useMediaQuery } from "@mantine/hooks";
import UpgradePickedSkin from "./UpgradePickedSkin";
import LowerThanIcon from "../../icons/LowerThanIcon";
import formatExterior from "../../../lib/formatExterior";
import SearchIcon from "../../icons/SearchIcon";

export default function UpgradeOverview() {
  const [userSkins, setUserSkins] = useState([]);
  const [upgradeSkins, setUpgradeSkins] = useState([]);
  const [pickedUserSkin, setPickedUserSkin] = useState(null);
  const [pickedUpgradeSkin, setPickedUpgradeSkin] = useState(null);

  const [userSkinPrice, setUserSkinPrice] = useState("");
  const [upgradeSkinPrice, setUpgradeSkinPrice] = useState("");
  const [userSkinName, setUserSkinName] = useState("");
  const [upgradeSkinName, setUpgradeSkinName] = useState("");

  const [under, setUnder] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [finished, setFinished] = useState(false);
  const [loose, setLoose] = useState(false);

  const [updateInventory, setUpdateInventory] = useState(false);

  const mobile = useMediaQuery("(max-width: 900px)");

  useEffect(() => {
    async function fetchSkins() {
      const response = await fetch(
        `/api/casino/upgrade/skins?price=${userSkinPrice}&name=${userSkinName}`
      );
      if (response.ok) {
        setUserSkins(await response.json());
      }
    }
    fetchSkins();
  }, [updateInventory, userSkinPrice, userSkinName]);

  useEffect(() => {
    async function fetchSkins() {
      const body = {
        id: pickedUserSkin._id,
        price: upgradeSkinPrice,
        name: upgradeSkinName,
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
  }, [pickedUserSkin, upgradeSkinPrice, upgradeSkinName]);

  const chance = useMemo(() => {
    if (pickedUserSkin && pickedUpgradeSkin) {
      const calculatedChance =
        (pickedUserSkin.price / pickedUpgradeSkin.price) * 100;
      return Math.round(calculatedChance * 100) / 100;
    } else {
      return null;
    }
  }, [pickedUpgradeSkin, pickedUserSkin]);

  useEffect(() => {
    if (finished) {
      //user has won
      if (result?.result) {
        openModal({
          children: <UpgradeWonModal skin={pickedUpgradeSkin} />,
          size: mobile ? "md" : "lg",
        });
        setLoose(false);
      } else {
        setLoose(true);
      }
      setUpdateInventory(!updateInventory);
      setPickedUserSkin(null);
      setPickedUpgradeSkin(null);
      setUpgradeSkins([]);
      setLoading(false);
      setFinished(false);
    }
  }, [finished, result, pickedUpgradeSkin, updateInventory]);

  return (
    <Container fluid>
      <Grid justify={"center"} align="center">
        <Grid.Col xs={6} order={1} orderSm={2} xl={4} orderXl={1}>
          <UpgradePickedSkin skin={pickedUserSkin} />
        </Grid.Col>
        <Grid.Col xs={12} order={3} orderSm={1} xl={4} orderXl={2}>
          <Center>
            <UpgradeRing
              finished={finished}
              setFinished={setFinished}
              result={result}
              chance={chance}
              under={under}
              setUnder={setUnder}
              loose={loose}
            />
          </Center>
        </Grid.Col>
        <Grid.Col xs={6} order={2} orderSm={3} xl={4} orderXl={3}>
          <UpgradePickedSkin skin={pickedUpgradeSkin} />
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={6}>
          <Button
            disabled={loading}
            fullWidth
            size="lg"
            color={"orange"}
            variant="outline"
            onClick={() => setUnder(!under)}
          >
            {under ? "Under" : "Over"}
          </Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <Center>
            <Button
              disabled={loading || !pickedUserSkin || !pickedUpgradeSkin}
              fullWidth
              variant="light"
              size="lg"
              color={"yellow"}
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
                } else {
                  showNotification({
                    title: "Error",
                    message: "Oops something went wrong. Try another skin.",
                    color: "red",
                  });
                }
              }}
            >
              <Text>UPGRADE</Text>
            </Button>
          </Center>
        </Grid.Col>
      </Grid>
      <Grid mt={20}>
        <Grid.Col xs={12} xl={6}>
          <Container fluid>
            <Group>
              <Text>Your skins ({userSkins.length})</Text>
              <Input
                icon={<SearchIcon size={20} />}
                placeholder="filter by name"
                value={userSkinName}
                onChange={(e) => setUserSkinName(e.target.value)}
              />
              <Input
                rightSection={<DollarIcon size={20} />}
                icon={<LowerThanIcon size={20} />}
                placeholder="filter by price"
                value={userSkinPrice}
                onChange={(e) => setUserSkinPrice(e.target.value)}
              />
            </Group>
            {userSkins.length > 0 && (
              <ScrollArea mt={20} style={{ height: 500 }} offsetScrollbars>
                <Grid>
                  {userSkins.map((skin) => {
                    const { namePartOne, namePartTwo, shortExterior } =
                      formatExterior(skin.name, skin.exterior);
                    return (
                      <Grid.Col key={skin._id} span={6} sm={4} md={3}>
                        <Card
                          sx={{
                            borderColor:
                              pickedUserSkin === skin
                                ? "green"
                                : skin.statTrak
                                ? "orange"
                                : skin.souvenir
                                ? "yellow"
                                : "dark",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            if (loading) return;
                            if (pickedUserSkin === skin) {
                              setPickedUserSkin(null);
                              return;
                            }
                            setUpgradeSkinPrice(null);
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
                                {shortExterior}
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
                              alt={skin.name}
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
        <Grid.Col xs={12} xl={6}>
          <Container fluid>
            <Group>
              <Text>Upgrade skins ({upgradeSkins.length})</Text>
              <Input
                icon={<SearchIcon size={20} />}
                placeholder={"filter by name"}
                value={upgradeSkinName}
                onChange={(e) => setUpgradeSkinName(e.target.value)}
              />
              <Input
                icon={<LowerThanIcon size={20} />}
                rightSection={<DollarIcon size={20} />}
                placeholder={pickedUserSkin?.price * 2 || "filter by price"}
                value={upgradeSkinPrice}
                onChange={(e) => setUpgradeSkinPrice(e.target.value)}
              />
            </Group>
            {upgradeSkins.length > 0 && (
              <ScrollArea mt={20} offsetScrollbars style={{ height: 500 }}>
                <Grid>
                  {upgradeSkins.map((skin) => {
                    const { namePartOne, namePartTwo, shortExterior } =
                      formatExterior(skin.name, skin.exterior);
                    return (
                      <Grid.Col key={skin._id} span={6} sm={4} md={3}>
                        <Card
                          sx={{
                            borderColor:
                              pickedUpgradeSkin === skin
                                ? "green"
                                : skin.statTrak
                                ? "orange"
                                : skin.souvenir
                                ? "yellow"
                                : "dark",
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
                                {shortExterior}
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
                              alt={skin.name}
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
