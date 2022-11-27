import { Grid, TextInput, ActionIcon, Tooltip, Group } from "@mantine/core";
import EditIcon from "../icons/EditIcon";
import { useState, useMemo } from "react";
import SaveIcon from "../icons/SaveIcon";
import { signOut } from "next-auth/react";
import { showNotification } from "@mantine/notifications";

export default function UsernameSettings({ session }) {
  const [username, setUsername] = useState(session.user.name);
  const [disabled, setDisabled] = useState(true);

  const isInvalidUsername = useMemo(() => {
    const usernameRegex = /^[a-zA-Z0-9_. ]*$/;
    return usernameRegex.test(username) && username.split("").length < 20
      ? ""
      : "invalid username";
  }, [username]);

  return (
    <Grid align={"center"}>
      <Grid.Col xs={6}>
        <Group position="left">
          <TextInput
            disabled={disabled}
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            error={isInvalidUsername}
          />
          <Tooltip withArrow label="Edit">
            <ActionIcon
              variant="transparent"
              onClick={() => setDisabled(!disabled)}
            >
              <EditIcon size={25} />
            </ActionIcon>
          </Tooltip>
          <Tooltip withArrow label="Save">
            <ActionIcon
              variant="transparent"
              disabled={isInvalidUsername}
              onClick={async () => {
                const response = await fetch("/api/user/settings", {
                  method: "POST",
                  body: JSON.stringify({ username: username }),
                  headers: { "Content-Type": "application/json" },
                });
                if (response.ok) {
                  signOut({
                    callbackUrl: window.location.origin + "/auth/login",
                  });
                } else {
                  showNotification({
                    title: "Error",
                    message: "Error while updating your username",
                    color: "red",
                  });
                }
              }}
            >
              <SaveIcon size={25} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Grid.Col>
    </Grid>
  );
}
