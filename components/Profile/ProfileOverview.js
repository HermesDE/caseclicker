import {
  Center,
  Container,
  Grid,
  Title,
  Text,
  Image,
  Card,
} from "@mantine/core";

export default function ProfileOverview({ user, userstat, skins, profile }) {
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
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={8}>
          <Card withBorder>
            <Text>{profile.description || "no description"}</Text>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
