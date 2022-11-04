import { Button, Center, Container, Grid, Stack, Title } from "@mantine/core";
import { getProviders, signIn, getSession } from "next-auth/react";
import Head from "next/head";

export default function SignIn({ providers }) {
  return (
    <>
      <Head>
        <title>SignIn | Case Clicker Online</title>
      </Head>
      <Container>
        <Grid mt={50} mb={20}>
          <Grid.Col>
            <Center>
              <Title>Welcome to Case Clicker Online</Title>
            </Center>
          </Grid.Col>
        </Grid>

        {Object.values(providers).map((provider) => {
          return (
            <Grid key={provider.name} justify="center" mt={5}>
              <Grid.Col xs={12} sm={6}>
                <Center>
                  <Button
                    fullWidth
                    variant="outline"
                    color={"orange"}
                    size="lg"
                    onClick={() => signIn(provider.id)}
                  >
                    Sign in with {provider.name}
                  </Button>
                </Center>
              </Grid.Col>
            </Grid>
          );
        })}
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
