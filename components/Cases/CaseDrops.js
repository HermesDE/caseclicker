import { Button, Grid } from "@mantine/core";
import { useEffect, useState } from "react";

export default function CaseDrops({ id, close }) {
  const [skins, setSkins] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/cases?case=${id}`);
      if (!response.ok) return;
      setSkins(await response.json());
    }
    fetchData();
  }, []);
  return (
    <>
      <Grid></Grid>
      <Grid>
        <Button onClick={close}>Schließen</Button>
      </Grid>
    </>
  );
}
