import {
  Center,
  Container,
  Grid,
  Loader,
  Select,
  Title,
  Button,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import UpCircleIcon from "../icons/UpCircleIcon";
import CustomSell from "./CustomSell";
import SkinCard from "./SkinCard";

export default function InventoryShowcase({ toggleMoneyUpdate }) {
  const [loading, setLoading] = useState(false);
  const [skins, setSkins] = useState([]);
  const [sortTimestamp, setSortTimestamp] = useState(true);
  const [exterior, setExterior] = useState("");
  const [rarity, setRarity] = useState("");
  const [sellLock, setSellLock] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch(
        `/api/inventory?sort=${sortTimestamp}${
          exterior ? `&exterior=${exterior}` : ""
        }${rarity ? `&rarity=${rarity}` : ""}`
      );
      if (!response.ok) {
        showNotification({
          title: "Error",
          message: `Error while fetching inventory\nError Message: ${response.status} ${response.statusText}`,
        });
        setLoading(false);
        return;
      }
      setSkins(await response.json());
      setLoading(false);
    }
    fetchData();
  }, [sortTimestamp, exterior, rarity]);

  const deleteSkin = (id) => {
    setSkins(skins.filter((skin) => skin._id !== id));
  };

  return (
    <Container fluid>
      <Grid align={"flex-end"}>
        <Grid.Col span={3}>
          <Select
            label="Sort"
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
        <Grid.Col span={3}>
          <Select
            label="Filter exterior"
            allowDeselect
            value={exterior}
            onChange={setExterior}
            data={[
              "Factory New",
              "Minimal Wear",
              "Field-Tested",
              "Well-Worn",
              "Battle-Scarred",
            ]}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <Select
            label="Filter rarity"
            allowDeselect
            value={rarity}
            onChange={setRarity}
            data={[
              "Common",
              "Uncommon",
              "Mil-Spec Grade",
              "Restricted",
              "Classified",
              "Covert",
            ]}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <Button
            onClick={() => {
              setExterior(undefined);
              setRarity(undefined);
            }}
          >
            Reset filters
          </Button>
        </Grid.Col>
      </Grid>
      <Grid mt={10}>
        <Grid.Col span={3}>
          <Button
            fullWidth
            color={"red"}
            variant={sellLock ? "filled" : "outline"}
            onClick={() => setSellLock(!sellLock)}
          >
            {sellLock ? "Activate Sellmode" : "Deactive Sellmode"}
          </Button>
        </Grid.Col>
        <Grid.Col span={3}>
          <Button
            color={"red"}
            variant={"light"}
            fullWidth
            onClick={() =>
              openModal({
                title: "Custom sell",
                children: <CustomSell toggleMoneyUpdate={toggleMoneyUpdate} />,
                size: "xl",
              })
            }
          >
            Open custom sell
          </Button>
        </Grid.Col>
      </Grid>
      {loading ? (
        <Center>
          <Loader mt={20} size={"xl"} color="orange" />
        </Center>
      ) : skins.length <= 0 ? (
        <Center mt={20}>
          <Title order={2}>No skins found</Title>
        </Center>
      ) : (
        <Grid mt={20} gutter={"xs"}>
          {skins.length > 0 &&
            skins.map((skin) => {
              return (
                <Grid.Col key={skin._id} span={4}>
                  <SkinCard
                    id={skin._id}
                    name={skin.name}
                    iconUrl={skin.iconUrl}
                    price={skin.price}
                    rarityColor={skin.rarityColor}
                    float={skin.float}
                    deleteSkin={deleteSkin}
                    toggleMoneyUpdate={toggleMoneyUpdate}
                    sellLock={sellLock}
                  />
                </Grid.Col>
              );
            })}
        </Grid>
      )}
    </Container>
  );
}
