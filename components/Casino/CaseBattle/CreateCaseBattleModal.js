import {
  Button,
  Card,
  Center,
  Grid,
  Image,
  ScrollArea,
  SegmentedControl,
  Select,
  Switch,
  Text,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import { useState, useEffect, useMemo } from "react";
import CaseOverview from "./CaseOverview";

export default function CreateCaseBattleModal({
  money,
  userOpenedCases,
  createCaseBattle,
}) {
  const [selectedCases, setSelectedCases] = useState([]);
  const [teams, setTeams] = useState("1");
  const [playerCount, setPlayerCount] = useState("2");
  const [isPrivate, setIsPrivate] = useState(false);

  const battlePrice = useMemo(() => {
    let price = 0;
    for (const c of selectedCases) {
      price += c.price;
    }
    return price;
  }, [selectedCases]);

  useEffect(() => {
    if (teams === "2") {
      setPlayerCount("4");
    }
  }, [teams]);

  const handleCaseIncrement = (c) => {
    setSelectedCases((current) => [...current, c]);
  };
  const handleCaseDecrement = (c) => {
    let cases = [...selectedCases];
    const index = cases.lastIndexOf(c);
    cases.splice(index, 1);

    setSelectedCases(cases);
  };

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
            value={isPrivate}
            onChange={(event) => setIsPrivate(event.currentTarget.checked)}
            size="md"
            color={"orange"}
          />
        </Grid.Col>
        <Grid.Col span={"auto"}>
          <Button
            disabled={money < battlePrice || selectedCases.length <= 0}
            color="orange"
            onClick={() =>
              createCaseBattle(
                teams,
                playerCount,
                isPrivate,
                battlePrice,
                selectedCases
              )
            }
          >
            Create for {battlePrice} $
          </Button>
        </Grid.Col>
      </Grid>
      <ScrollArea mt={20} style={{ height: 100, width: "100%" }}>
        <Grid sx={{ height: 100, width: 5000 }}>
          {selectedCases
            .slice(0)
            .reverse()
            .map((c, i) => {
              return (
                <Grid.Col span={"content"} key={i}>
                  <Image height={70} src={"/pictures/cases/" + c.iconUrl} />
                </Grid.Col>
              );
            })}
        </Grid>
      </ScrollArea>

      <CaseOverview
        userOpenedCases={userOpenedCases}
        handleCaseIncrement={handleCaseIncrement}
        handleCaseDecrement={handleCaseDecrement}
      />
    </>
  );
}
