import { Button, Container, Grid, Select } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";

export default function UserOverview() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/admin/users");
      const data = await response.json();
      let fetchedUsers = [];
      for (const user of data) {
        fetchedUsers.push({ label: user.email, value: user._id });
      }
      setUsers(fetchedUsers);
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Grid>
        <Grid.Col>
          <Select
            value={selectedUser}
            onChange={setSelectedUser}
            data={users}
          />
        </Grid.Col>
        <Grid.Col>
          <Button
            onClick={async () => {
              let body = {
                id: selectedUser,
              };
              const response = await fetch("/api/admin/users", {
                method: "DELETE",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
              });
              if (response.ok) {
                showNotification({ title: "User deleted", color: "green" });
              }
            }}
          >
            Delete User
          </Button>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
