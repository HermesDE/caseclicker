import { Container, Grid } from "@mantine/core";
import { useEffect, useState } from "react";
import CaseCard from "./CaseCard";

export default function CaseShowcase({
  toggleMoneyUpdate,
  money,
  userOpenedCases,
}) {
  const [cases, setCases] = useState([]);

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
    <Container fluid>
      <Grid>
        {cases.length > 0 &&
          cases.map((c) => {
            return (
              <Grid.Col key={c._id} span={4}>
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
                />
              </Grid.Col>
            );
          })}
      </Grid>
    </Container>
  );
}
