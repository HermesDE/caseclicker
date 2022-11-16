import {
  Button,
  Center,
  Container,
  Divider,
  Grid,
  List,
  MediaQuery,
  Stack,
  Title,
} from "@mantine/core";
import { getProviders, signIn, getSession } from "next-auth/react";
import Head from "next/head";

export default function Login({ providers }) {
  return (
    <>
      <Head>
        <title>Login | Case Clicker Online</title>
      </Head>
      <Container fluid>
        <Grid align={"center"}>
          <Grid.Col sm={5}>
            <Container fluid>
              <Grid>
                <Grid.Col>
                  <Center>
                    <Title>Case Clicker Online</Title>
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
                          onClick={() => signIn(provider.id)}
                        >
                          Login with {provider.name}
                        </Button>
                      </Center>
                    </Grid.Col>
                  </Grid>
                );
              })}
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
