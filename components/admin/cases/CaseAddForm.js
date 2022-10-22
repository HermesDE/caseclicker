import { Button, Container, Grid, MultiSelect, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";

export default function CaseAddForm() {
  const [skinArray, setSkinArray] = useState([]);
  const [selectedSkingroups, setSelectedSkingroups] = useState([]);
  const [skinSearch, setSkinSearch] = useState("");

  const [caseName, setCaseName] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [casePrice, setCasePrice] = useState(0);

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
        <Grid.Col span={4}>
          <TextInput
            label="Case name"
            value={caseName}
            onChange={(e) => setCaseName(e.target.value)}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="Case Icon URL"
            value={iconUrl}
            onChange={(e) => setIconUrl(e.target.value)}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="Case Price in Dollar"
            value={casePrice}
            onChange={(e) => setCasePrice(e.target.value)}
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
      <Grid>
        <Grid.Col span={3}>
          <Button
            disabled={!caseName || !selectedSkingroups.length > 0 || !casePrice}
            onClick={async () => {
              const body = {
                name: caseName,
                iconUrl: iconUrl,
                price: casePrice,
                skingroups: selectedSkingroups,
              };
              await fetch("/api/admin/cases", {
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
