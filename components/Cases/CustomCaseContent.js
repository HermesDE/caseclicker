import { Grid, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import CustomCaseContentSkinCard from "./CustomCaseContentSkinCard";

export default function CustomCaseContent({ id }) {
  const [loading, setLoading] = useState(true);
  const [skins, setSkins] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/customCases", {
        method: "PATCH",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        setSkins(await response.json());
      }
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Grid justify={"center"} align="center">
        <Loader size={"xl"} color="orange" />
      </Grid>
    );
  }

  return (
    <Grid>
      {skins.length > 0 &&
        skins.map((skin, i) => {
          return (
            <Grid.Col key={i} xs={6} md={4}>
              <CustomCaseContentSkinCard skin={skin} />
            </Grid.Col>
          );
        })}
    </Grid>
  );
}
