import { Center, Container, Grid, Title } from "@mantine/core";

export default function ProfileOverview({ user, userstat, skins }) {
  return (
    <Container fluid>
      <Grid>
        <Grid.Col span={12}>
          <Center>
            <Title>Profile of {user.name}</Title>
          </Center>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
