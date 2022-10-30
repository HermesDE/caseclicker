import { Drawer, ScrollArea, Text } from "@mantine/core";
import NotificationCard from "./NotificationCard";

export default function NotificationDrawer({
  notifications,
  open,
  setOpen,
  deleteNotification,
}) {
  return (
    <Drawer
      opened={open}
      onClose={() => setOpen(false)}
      title="Notifications"
      padding={"xl"}
      size="xl"
    >
      {notifications.length > 0 ? (
        <ScrollArea sx={{ height: "100%" }}>
          {notifications.map((notification) => {
            return (
              <NotificationCard
                key={notification._id}
                id={notification._id}
                title={notification.title}
                message={notification.message}
                createdAt={new Date(notification.createdAt)}
                deleteNotification={deleteNotification}
              />
            );
          })}
          <div style={{ height: 50 }}></div>
        </ScrollArea>
      ) : (
        <Text weight={500}>You dont have any notifications</Text>
      )}
    </Drawer>
  );
}
