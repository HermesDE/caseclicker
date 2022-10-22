import { Container, Grid } from "@mantine/core";
import { useEffect, useState } from "react";
import CaseCard from "./CaseCard";

export default function CaseShowcase({ toggleMoneyUpdate }) {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/cases");
      if (!response.ok) return;
      setCases(await response.json());
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
                />
              </Grid.Col>
            );
          })}
      </Grid>
    </Container>
  );
}
