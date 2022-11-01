import {
  Button,
  Container,
  Grid,
  MultiSelect,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";

export default function CaseAddForm() {
  const [skinArray, setSkinArray] = useState([]);
  const [selectedSkingroups, setSelectedSkingroups] = useState([]);
  const [percentage, setPercentage] = useState([]);

  const [skinSearch, setSkinSearch] = useState("");

  const [caseName, setCaseName] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [caseUrl, setCaseUrl] = useState("");
  const [casePrice, setCasePrice] = useState(0);
  const [neededOpenedCases, setNeededOpenedCases] = useState(0);

  /*  for (let i = 1; i <= 1000; i++) {
    setNumbers([...numbers, i]);
  } */

  useEffect(() => {
    async function fetchData() {
      let formattedSkingroups = [];
      const response = await fetch("/api/admin/skingroups");
      const skingroups = await response.json();
      for (const skingroup of skingroups) {
        let obj = {
          label: skingroup.name,
          value: skingroup._id,
        };
        formattedSkingroups.push(obj);
      }
      setSkinArray(formattedSkingroups);
    }
    fetchData();
  }, []);

  return (
    <Container fluid>
      <Grid>
        <Grid.Col span={3}>
          <TextInput
            label="Case name"
            value={caseName}
            onChange={(e) => setCaseName(e.target.value)}
          />
        </Grid.Col>

        <Grid.Col span={3}>
          <TextInput
            label="Case Price in Dollar"
            value={casePrice}
            onChange={(e) => setCasePrice(e.target.value)}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <TextInput
            label="Needed opened cases"
            value={neededOpenedCases}
            onChange={(e) => setNeededOpenedCases(e.target.value)}
          />
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            label="Case Icon URL"
            value={iconUrl}
            onChange={(e) => setIconUrl(e.target.value)}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Case URL"
            value={caseUrl}
            onChange={(e) => setCaseUrl(e.target.value)}
          />
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={3}>
          <TextInput
            label="Search skins"
            value={skinSearch}
            onChange={(e) => setSkinSearch(e.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col span={9}>
          <MultiSelect
            data={skinArray}
            label="selected skins"
            value={selectedSkingroups}
            onChange={setSelectedSkingroups}
            searchable
            searchValue={skinSearch}
            maxDropdownHeight={200}
            limit={50}
            clearable
          />
        </Grid.Col>
      </Grid>
      {selectedSkingroups.length > 0 &&
        selectedSkingroups.map((skin, i) => {
          return (
            <Grid key={i}>
              <Grid.Col span={6}>
                <Text>{skin}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  value={percentage[i]}
                  onChange={(value) => {
                    setPercentage([
                      ...percentage,
                      (percentage[i] = value.target.value),
                    ]);
                  }}
                />
              </Grid.Col>
            </Grid>
          );
        })}
      <Grid>
        <Grid.Col span={3}>
          <Button
            disabled={!caseName || !selectedSkingroups.length > 0 || !casePrice}
            onClick={async () => {
              let skingroups = [];
              for (const [i, skin] of selectedSkingroups.entries()) {
                const obj = {
                  skingroup: skin,
                  chance: selectedPercentage[i],
                };
                skingroups.push(obj);
              }
              const body = {
                name: caseName,
                iconUrl: iconUrl,
                price: casePrice,
                skingroups: skingroups,
                odds: selectedPercentage,
                caseUrl: caseUrl,
                neededOpenedCases: neededOpenedCases,
              };
              await fetch("/api/admin/customCases", {
                method: "POST",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
              });
            }}
          >
            Create Case
          </Button>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
