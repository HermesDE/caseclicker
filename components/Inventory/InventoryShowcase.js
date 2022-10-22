import { Container, Grid, Select, Transition } from "@mantine/core";
import { useEffect, useState } from "react";
import UpCircleIcon from "../icons/UpCircleIcon";
import SkinCard from "./SkinCard";

export default function InventoryShowcase() {
  const [loading, setLoading] = useState(false);
  const [skins, setSkins] = useState([]);
  const [sortTimestamp, setSortTimestamp] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/inventory?sort=${sortTimestamp}`);
      if (!response.ok) return;
      setSkins(await response.json());
    }
    setLoading(true);
    fetchData();
    setLoading(false);
  }, [sortTimestamp]);

  const deleteSkin = (id) => {
    setSkins(skins.filter((skin) => skin._id !== id));
  };

  return (
    <Container fluid>
      <Grid>
        <Grid.Col span={3}>
          <Select
            value={sortTimestamp}
            onChange={setSortTimestamp}
            data={[
              { value: true, label: "last opened" },
              { value: false, label: "first opened" },
              {
                value: "price",
                label: "Price",
              },
            ]}
          />
        </Grid.Col>
      </Grid>
      <Grid gutter={"xs"}>
        {skins.length > 0 &&
          skins.map((skin) => {
            return (
              <Grid.Col span={4}>
                <SkinCard
                  id={skin._id}
                  name={skin.name}
                  iconUrl={skin.iconUrl}
                  price={skin.price}
                  rarityColor={skin.rarityColor}
                  float={skin.float}
                  deleteSkin={deleteSkin}
                />
              </Grid.Col>
            );
          })}
      </Grid>
    </Container>
  );
}
