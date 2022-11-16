import { Container, Grid } from "@mantine/core";
import { useEffect, useState } from "react";
import CaseCard from "./CaseCard";
import useSound from "use-sound";

export default function CaseShowcase({
  toggleMoneyUpdate,
  money,
  userOpenedCases,
}) {
  const [cases, setCases] = useState([]);
  const [caseOpenSound] = useSound("/sounds/caseOpen.mp3", { volume: 0.1 });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/cases");
      if (!response.ok) return;
      let cases = await response.json();
      cases = cases.sort((a, b) => a.neededOpenedCases - b.neededOpenedCases);
      setCases(cases);
    }
    fetchData();
  }, []);

  return (
    <Container mt={20} fluid>
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
                />
              </Grid.Col>
            );
          })}
      </Grid>
    </Container>
  );
}
