import { Carousel } from "@mantine/carousel";
import {
  Center,
  Container,
  Grid,
  Title,
  Text,
  Image,
  Card,
  TextInput,
} from "@mantine/core";
import UnboxedSkinCard from "../Cases/UnboxedSkinCard";

export default function ProfileOverview({
  user,
  userstat,
  skins,
  inventory,
  profile,
  rank,
}) {
  if (profile.private) {
    return (
      <Container fluid>
        <Grid>
          <Grid.Col span={12}>
            <Center>
              <Title>Profile of {user.name}</Title>
            </Center>
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={12}>
            <Center>
              <Text weight={500}>This profile is private</Text>
            </Center>
          </Grid.Col>
        </Grid>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Grid>
        <Grid.Col span={12}>
          <Center>
            <Title>Profile of {user.name}</Title>
          </Center>
        </Grid.Col>
      </Grid>
      <Grid mt={20}>
        <Grid.Col span={4}>
          <Grid>
            <Grid.Col span={12}>
              <Center>
                <Image
                  width={100}
                  height={100}
                  fit="contain"
                  src={user.image}
                />
              </Center>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={12}>
              <Center>
                {userstat.createdAt ? (
                  <Text size={"sm"}>
                    member since{" "}
                    {new Date(userstat.createdAt).toLocaleDateString()}
                  </Text>
                ) : (
                  <Text size={"sm"}>oldschool member</Text>
                )}
              </Center>
              <Center>
                <Image src={rank.image} width={100} fit="contain" />
              </Center>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={8}>
          <Card withBorder>
            {profile.description.length > 0 ? (
              profile.description.map((line) => <Text>{line}</Text>)
            ) : (
              <Text>no description</Text>
            )}
          </Card>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={12}>
          <Center>
            <Title order={2}>Statistics</Title>
          </Center>
        </Grid.Col>
      </Grid>
      <Grid justify={"center"}>
        <Grid.Col span={"content"}>
          <Text size={"xl"} weight={500}>
            Total clicks
          </Text>
          <Text size={"lg"}>{userstat.clicks}</Text>
        </Grid.Col>
        <Grid.Col span={"content"}>
          <Text size={"xl"} weight={500}>
            Money earned
          </Text>
          <Text size={"lg"}>
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: "USD",
            }).format(userstat.moneyEarned)}
          </Text>
        </Grid.Col>
        <Grid.Col span={"content"}>
          <Text size={"xl"} weight={500}>
            Money spent
          </Text>
          <Text size={"lg"}>
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: "USD",
            }).format(userstat.moneySpent)}
          </Text>
        </Grid.Col>
        <Grid.Col span={"content"}>
          <Text size={"xl"} weight={500}>
            Inventory count
          </Text>
          <Text size={"lg"}>{inventory.count}</Text>
        </Grid.Col>
        <Grid.Col span={"content"}>
          <Text size={"xl"} weight={500}>
            Inventory value
          </Text>
          <Text size={"lg"}>
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: "USD",
            }).format(inventory.value)}
          </Text>
        </Grid.Col>
        <Grid.Col span={"content"}>
          <Text size={"xl"} weight={500}>
            Opened cases
          </Text>
          <Text size={"lg"}>{userstat.openedCases}</Text>
        </Grid.Col>
      </Grid>
      <Grid mt={10} justify={"center"}>
        <Grid.Col span={"content"}>
          <Text size={"xl"} weight={500}>
            Tokens won
          </Text>
          <Text size={"lg"}>{parseInt(userstat.tokensWon)}</Text>
        </Grid.Col>
        <Grid.Col span={"content"}>
          <Text size={"xl"} weight={500}>
            Tokens lost
          </Text>
          <Text size={"lg"}>{parseInt(userstat.tokensLost)}</Text>
        </Grid.Col>
        <Grid.Col span={"content"}>
          <Text size={"xl"} weight={500}>
            Coinflips
          </Text>
          <Text size={"lg"}>{parseInt(userstat.coinflips)}</Text>
        </Grid.Col>
        <Grid.Col span={"content"}>
          <Text size={"xl"} weight={500}>
            Coinflips won
          </Text>
          <Text size={"lg"}>{parseInt(userstat.coinflipsWon)}</Text>
        </Grid.Col>
        <Grid.Col span={"content"}>
          <Text size={"xl"} weight={500}>
            Upgrades
          </Text>
          <Text size={"lg"}>{parseInt(userstat.upgrades)}</Text>
        </Grid.Col>
        <Grid.Col span={"content"}>
          <Text size={"xl"} weight={500}>
            Upgrades won
          </Text>
          <Text size={"lg"}>{parseInt(userstat.upgradesWon)}</Text>
        </Grid.Col>
      </Grid>
      {skins.length > 0 && (
        <>
          <Grid mt={20}>
            <Grid.Col span={12}>
              <Center>
                <Title order={2}>Most valuable skins</Title>
              </Center>
            </Grid.Col>
          </Grid>
          <Grid mt={10}>
            <Grid.Col span={12}>
              <Carousel
                align="start"
                withIndicators
                height={400}
                slideGap="sm"
                breakpoints={[
                  {
                    maxWidth: "xs",
                    slideSize: "100%",
                  },
                  {
                    minWidth: "xs",
                    slideSize: "100%",
                  },
                  {
                    minWidth: "sm",
                    slideSize: skins.length === 1 ? "100%" : "50%",
                  },
                  {
                    minWidth: "xl",
                    slideSize: skins.length === 1 ? "100%" : "33.333333%",
                  },
                ]}
              >
                {skins.map((skin) => {
                  return (
                    <Carousel.Slide key={skin._id}>
                      <UnboxedSkinCard skin={skin} playSound={false} />
                    </Carousel.Slide>
                  );
                })}
              </Carousel>
            </Grid.Col>
          </Grid>
        </>
      )}
    </Container>
  );
}
