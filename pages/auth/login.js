import {
  Button,
  Center,
  Checkbox,
  Container,
  Divider,
  Grid,
  List,
  MediaQuery,
  Stack,
  Text,
  Title,
  Group,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { getProviders, signIn, getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Login({ providers }) {
  const [agreed, setAgreed] = useState(false);
  const [color, setColor] = useState("white");

  return (
    <>
      <Head>
        <title>Login | Case Clicker Online</title>
        <meta name="description" content="Login to your account" />
        <meta name="keywords" content="login, signin" />
      </Head>
      <Container fluid>
        <Grid align={"center"}>
          <Grid.Col sm={5}>
            <Container fluid>
              <Grid mb={15}>
                <Grid.Col>
                  <Center>
                    <Image
                      alt="case clicker online logo"
                      src={"/pictures/logos/big/logo-no-background.png"}
                      width={500}
                      height={250}
                    />
                  </Center>
                </Grid.Col>
              </Grid>
              {Object.values(providers).map((provider) => {
                return (
                  <Grid key={provider.name} justify="center" mt={5}>
                    <Grid.Col xs={12} xl={6}>
                      <Center>
                        <Button
                          fullWidth
                          variant="outline"
                          color={"orange"}
                          size="md"
                          onClick={() => {
                            if (!agreed) {
                              showNotification({
                                title:
                                  "You need to agree to the terms and conditions and privacy policy first",
                                color: "red",
                              });
                              setColor("red");
                              return;
                            }
                            signIn(provider.id);
                          }}
                        >
                          Login with {provider.name}
                        </Button>
                      </Center>
                    </Grid.Col>
                  </Grid>
                );
              })}
              <Grid justify={"center"}>
                <Grid.Col xs={12} xl={6}>
                  <Center>
                    <Checkbox
                      label={
                        <Group>
                          <Text>I agree to the</Text>
                          <Link href="/privacy-policy" passHref>
                            <Text component="a" color={color}>
                              <span
                                style={{
                                  color: color === "red" ? color : "steelblue",
                                }}
                              >
                                Privacy Policy
                              </span>
                            </Text>
                          </Link>
                          <Text>and</Text>
                          <Link href="/terms-and-conditions" passHref>
                            <Text component="a" color={color}>
                              <span
                                style={{
                                  color: color === "red" ? color : "steelblue",
                                }}
                              >
                                Terms and Conditions
                              </span>
                            </Text>
                          </Link>
                        </Group>
                      }
                      value={agreed}
                      onChange={(e) => setAgreed(e.currentTarget.checked)}
                    />
                  </Center>
                </Grid.Col>
              </Grid>
            </Container>
          </Grid.Col>
          <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
            <Grid.Col sx={{ height: "100vh" }} sm={1}>
              <Divider
                sx={{ height: "100vh" }}
                orientation="vertical"
                color="orange.5"
              />
            </Grid.Col>
          </MediaQuery>

          <Grid.Col sm={6}>
            <Container fluid>
              <Grid>
                <Grid.Col>
                  <Title>Features</Title>
                  <List size={"lg"} mt={20}>
                    <List.Item>All CS:GO skins</List.Item>
                    <List.Item>
                      Realistic skin prices, which are updated daily
                    </List.Item>
                    <List.Item>
                      Inventory that houses all your drawn skins
                    </List.Item>
                    <List.Item>
                      Marketplace where every player can buy and sell skins at
                      their own prices
                    </List.Item>
                    <List.Item>
                      Casino with real time coinflip, an upgrader and many
                      future games
                    </List.Item>
                    <List.Item>
                      Play from any device with one savegame
                    </List.Item>
                  </List>
                </Grid.Col>
              </Grid>
            </Container>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
