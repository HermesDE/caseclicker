import { Card, Text } from "@mantine/core";

export default function SelectedCase({ c }) {
  return (
    <Card>
      <Text weight={500}>{c}</Text>
    </Card>
  );
}
