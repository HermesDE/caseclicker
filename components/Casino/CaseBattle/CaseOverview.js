import { Card, Grid } from "@mantine/core";
import SelectCase from "./SelectCase";
import { useState, useEffect } from "react";

export default function CaseOverview({
  userOpenedCases,
  handleCaseIncrement,
  handleCaseDecrement,
}) {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/customCases");
      const response = await fetch("/api/cases");

      const customCases = await res.json();
      const cs = await response.json();
      const allCases = customCases.concat(cs);
      for (const [i, c] of allCases.entries()) {
        if (c.neededOpenedCases > userOpenedCases) {
          allCases.splice(i, 1);
        }
      }
      setCases(allCases);
    }
    fetchData();
  }, []);

  return (
    <Grid>
      {cases.map((c, i) => {
        return (
          <Grid.Col key={i} span={12}>
            <SelectCase
              c={c}
              handleCaseIncrement={handleCaseIncrement}
              handleCaseDecrement={handleCaseDecrement}
            />
          </Grid.Col>
        );
      })}
    </Grid>
  );
}
