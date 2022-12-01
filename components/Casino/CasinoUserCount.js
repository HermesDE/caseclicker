import { Grid, Text } from "@mantine/core";

export default function CasinoUserCount({ userCount }) {
  return (
    <Grid>
      <Grid.Col span={12}>
        <Text size={"lg"} weight={500}>
          {userCount} {userCount > 1 ? "users" : "user"} online
        </Text>
      </Grid.Col>
    </Grid>
  );
}
