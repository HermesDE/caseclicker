import {
  Button,
  Card,
  Center,
  Grid,
  SegmentedControl,
  Switch,
  Text,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import { useState, useEffect } from "react";
import SelectedCase from "./SelectedCase";
import CaseSelectorModal from "./CaseSelectorModal";

export default function CreateCaseBattleModal({ money, userOpenedCases }) {
  const [selectedCases, setSelectedCases] = useState([]);
  const [teams, setTeams] = useState("1");
  const [playerCount, setPlayerCount] = useState("2");
  const [privateGame, setPrivateGame] = useState(false);

  useEffect(() => {
    if (teams === "2") {
      setPlayerCount("4");
    }
  }, [teams]);

  return (
    <>
      <Grid align={"center"}>
        <Grid.Col span={"content"}>
          <Text weight={500}>Teams</Text>
        </Grid.Col>
        <Grid.Col span={"content"}>
          <SegmentedControl
            data={[
              { value: "1", label: "No" },
              { value: "2", label: "Yes" },
            ]}
            value={teams}
            onChange={setTeams}
            color="orange"
            fullWidth
          />
        </Grid.Col>
        <Grid.Col span={"content"}>
          <Text weight={500}>Players</Text>
        </Grid.Col>
        <Grid.Col span={"content"}>
          <SegmentedControl
            data={teams === "1" ? ["2", "3", "4"] : ["4"]}
            value={playerCount}
            onChange={setPlayerCount}
            color="orange"
            fullWidth
          />
        </Grid.Col>
        <Grid.Col span={"content"}>
          <Text weight={500}>Private</Text>
        </Grid.Col>
        <Grid.Col span={"content"}>
          <Switch
            aria-label="private"
            value={privateGame}
            onChange={(event) => setPrivateGame(event.currentTarget.checked)}
            size="md"
            color={"orange"}
          />
        </Grid.Col>
      </Grid>
      <Grid grow>
        {selectedCases.map((c) => {
          return (
            <Grid.Col span={3}>
              <SelectedCase c={c} />
            </Grid.Col>
          );
        })}
        <Grid.Col span={3}>
          <Card>
            <Center>
              <Button
                color={"orange"}
                variant="light"
                onClick={() =>
                  openModal({
                    title: "Select cases",
                    children: (
                      <CaseSelectorModal
                        setSelectedCases={setSelectedCases}
                        selectedCases={selectedCases}
                        userOpenedCases={userOpenedCases}
                      />
                    ),
                    size: "fullscreen",
                  })
                }
              >
                Add Cases
              </Button>
            </Center>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}
