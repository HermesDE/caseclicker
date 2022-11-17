import { Container, Grid, Tabs } from "@mantine/core";
import { useEffect, useState } from "react";
import CaseCard from "./CaseCard";
import useSound from "use-sound";

export default function CaseShowcase({
  toggleMoneyUpdate,
  money,
  userOpenedCases,
}) {
  const [cases, setCases] = useState([]);
  const [customCases, setCustomCases] = useState([]);
  const [caseOpenSound] = useSound("/sounds/caseOpen.mp3", { volume: 0.1 });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/cases");
      if (!response.ok) return;
      let cases = await response.json();
      cases = cases.sort((a, b) => a.neededOpenedCases - b.neededOpenedCases);
      setCases(cases);
    }
    async function fetchCustomCases() {
      const response = await fetch("/api/customCases");
      if (!response.ok) return;
      let cases = await response.json();
      cases = cases.sort((a, b) => a.neededOpenedCases - b.neededOpenedCases);
      setCustomCases(cases);
    }
    fetchData();
    fetchCustomCases();
  }, []);

  return (
    <Container fluid>
      <Tabs
        styles={{ tab: { fontSize: 20, fontWeight: 500 } }}
        defaultValue={"cases"}
      >
        <Tabs.List mb={20} grow position="center">
          <Tabs.Tab p={20} value="cases">
            Cases
          </Tabs.Tab>
          <Tabs.Tab p={20} value="customCases">
            Custom Cases
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="cases">
          <Grid>
            {cases.length > 0 &&
              cases.map((c) => {
                return (
                  <Grid.Col key={c._id} xs={12} sm={6} lg={6} xl={4}>
                    <CaseCard
                      toggleMoneyUpdate={toggleMoneyUpdate}
                      id={c._id}
                      name={c.name}
                      iconUrl={c.iconUrl}
                      price={c.price}
                      money={money}
                      link={c.link}
                      neededOpenedCases={c.neededOpenedCases}
                      userOpenedCases={userOpenedCases}
                      caseOpenSound={caseOpenSound}
                      customCase={false}
                    />
                  </Grid.Col>
                );
              })}
          </Grid>
        </Tabs.Panel>
        <Tabs.Panel value="customCases">
          <Grid>
            {customCases.length > 0 &&
              customCases.map((c) => {
                return (
                  <Grid.Col key={c._id} xs={12} sm={6} lg={6} xl={4}>
                    <CaseCard
                      toggleMoneyUpdate={toggleMoneyUpdate}
                      id={c._id}
                      name={c.name}
                      iconUrl={c.iconUrl}
                      price={c.price}
                      money={money}
                      link={c.link}
                      neededOpenedCases={c.neededOpenedCases}
                      userOpenedCases={userOpenedCases}
                      caseOpenSound={caseOpenSound}
                      customCase={true}
                    />
                  </Grid.Col>
                );
              })}
          </Grid>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
