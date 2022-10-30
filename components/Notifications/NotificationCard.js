import { Badge, Card, CloseButton, Group, Text } from "@mantine/core";

export default function NotificationCard({
  id,
  title,
  message,
  createdAt,
  deleteNotification,
}) {
  return (
    <>
      <Card mt={10}>
        <Group position="apart">
          <Text weight={500} size="lg">
            {title}
          </Text>
          <Badge>
            {createdAt.toLocaleDateString() +
              " " +
              createdAt.toLocaleTimeString()}
          </Badge>
          <CloseButton
            onClick={async () => {
              const body = {
                id: id,
              };
              const response = await fetch("/api/notifications", {
                method: "DELETE",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
              });
              if (response.ok) {
                deleteNotification(id);
              }
            }}
          />
        </Group>
        <Text size={"sm"}>{message}</Text>
      </Card>
    </>
  );
}
