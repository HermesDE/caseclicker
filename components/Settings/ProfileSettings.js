import { Button, Grid, Loader, Switch, Text, Textarea } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";

export default function ProfileSettings() {
  const [privateProfile, setPrivateProfile] = useState(false);
  const [description, setDescription] = useState([]);
  const [formattedDescription, setFormattedDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let text = "";
    for (const line of description) {
      text += `${line}\n`;
    }
    setFormattedDescription(text);
  }, [description]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/user/profile");
      if (!response.ok) {
        return showNotification({
          title: "Error",
          message: "Error while fetching profile settings",
          color: "red",
        });
      }
      const data = await response.json();
      setPrivateProfile(data.private);
      setDescription(data.description);
    }
    fetchData();
    setLoading(false);
  }, []);

  return (
    <>
      <Grid>
        <Grid.Col span={12}>
          <Text weight={500}>Profile Settings</Text>
        </Grid.Col>
      </Grid>
      {loading ? (
        <Loader size={"xl"} color="orange" />
      ) : (
        <>
          <Grid>
            <Grid.Col span={12}>
              <Switch
                label={"Private profile"}
                labelPosition="left"
                checked={privateProfile}
                onChange={(e) => setPrivateProfile(e.currentTarget.checked)}
              />
            </Grid.Col>
          </Grid>
          <Grid mt={10}>
            <Grid.Col span={"content"}>
              <Text>Description</Text>
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Textarea
                value={formattedDescription}
                onChange={(e) => setFormattedDescription(e.currentTarget.value)}
                autosize
                maxLength={500}
                maxRows={5}
              />
            </Grid.Col>
          </Grid>
          <Grid mt={10}>
            <Grid.Col span={12}>
              <Button
                color={"orange"}
                onClick={async () => {
                  const body = {
                    privateProfile,
                    description: formattedDescription,
                  };
                  const response = await fetch("/api/user/profile", {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: { "Content-Type": "application/json" },
                  });
                  if (!response.ok) {
                    return showNotification({
                      title: "Error",
                      message: "Error while saving profile settings",
                      color: "red",
                    });
                  }
                  showNotification({
                    title: "Success",
                    message: "Profile settings successfully saved",
                    color: "green",
                  });
                }}
              >
                Save
              </Button>
            </Grid.Col>
          </Grid>
        </>
      )}
    </>
  );
}
