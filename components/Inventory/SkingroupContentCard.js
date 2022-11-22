import {
  Badge,
  Card,
  Grid,
  Group,
  Image,
  Loader,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import SkingroupContentSkinCard from "./SkingroupContentSkinCard";

export default function SkingroupContentCard({ classId }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/inventory/skin/${classId}`);
      //console.log(await response.json());
      setData(await response.json());
    }
    fetchData();
    setLoading(false);
  }, [classId]);

  return (
    <>
      {loading ? (
        <Loader size={"xl"} color="orange" />
      ) : (
        <>
          <Grid>
            <Grid.Col span={12}>
              <Title order={2} color={"#" + data?.skingroup?.rarityColor}>
                {data?.skingroup?.name}
              </Title>
            </Grid.Col>
          </Grid>
          <Grid>
            {data?.skins?.map((skin) => (
              <SkingroupContentSkinCard key={skin._id} skin={skin} />
            ))}
          </Grid>
        </>
      )}
    </>
  );
}
