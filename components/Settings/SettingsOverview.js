import { Button, Text, Container, Grid, Title, Divider } from "@mantine/core";
import { closeAllModals, openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { signOut } from "next-auth/react";
import CardSizeSettings from "./CardSizeSettings";
import UsernameSettings from "./UsernameSettings";

export default function SettingsOverview({ session }) {
  return (
    <Container fluid>
      <Grid>
        <Grid.Col>
          <Title order={2}>Settings</Title>
        </Grid.Col>
      </Grid>
      <UsernameSettings session={session} />
      <Divider mt={20} mb={20} size={"md"} />
      <CardSizeSettings />
      <Divider mt={20} mb={20} size={"md"} />
      <Grid>
        <Grid.Col>
          <Button
            color={"red"}
            onClick={() =>
              openConfirmModal({
                title: "Delete account",
                confirmProps: { color: "red" },
                children: (
                  <Text>
                    Do you really want to delete your account? All your game
                    progress will be deleted and cannot be restored later.
                  </Text>
                ),
                labels: { confirm: "Delete account", cancel: "Cancel" },
                onConfirm: async () => {
                  const response = await fetch("/api/user/settings", {
                    method: "DELETE",
                  });
                  if (response.ok) {
                    signOut({
                      callbackUrl: window.location.origin,
                    });
                  } else {
                    showNotification({
                      title: "Error",
                      message: "There was an error deleting your account.",
                      color: "red",
                    });
                  }
                },
                onCancel: () => closeAllModals(),
              })
            }
          >
            Delete Account
          </Button>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
