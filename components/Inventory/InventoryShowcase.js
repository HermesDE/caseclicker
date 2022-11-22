import {
  Center,
  Container,
  Grid,
  Loader,
  Select,
  Title,
  Button,
  Text,
  Pagination,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import CustomSell from "./CustomSell";
import SkinCard from "./SkinCard";

export default function InventoryShowcase({ toggleMoneyUpdate }) {
  const [loading, setLoading] = useState(false);
  const [skins, setSkins] = useState([]);
  const [sortTimestamp, setSortTimestamp] = useLocalStorage({
    defaultValue: "true",
    key: "sortTimestamp",
  });
  const [exterior, setExterior] = useLocalStorage({
    defaultValue: "",
    key: "exterior",
  });
  const [rarity, setRarity] = useLocalStorage({
    defaultValue: "",
    key: "rarity",
  });
  const [sellLock, setSellLock] = useState(true);
  const [inventoryValue, setInventoryValue] = useState(0);
  const [inventoryCount, setInventoryCount] = useState(0);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const deleteSkin = (id) => {
    setSkins(skins.filter((skin) => skin._id !== id));
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch(
        `/api/inventory?page=${page}&sort=${sortTimestamp}${
          exterior ? `&exterior=${exterior}` : ""
        }${rarity ? `&rarity=${rarity}` : ""}`
      );
      if (!response.ok) {
        if (response.status !== 401) {
          showNotification({
            title: "Error",
            message: `Error while fetching inventory\nError Message: ${response.status} ${response.statusText}`,
            color: "red",
          });
        }

        setLoading(false);
        return;
      }
      const data = await response.json();
      setSkins(data.skins);

      setInventoryCount(data.count);
      setTotalPages(data.pages);
      setLoading(false);
    }
    fetchData();
  }, [sortTimestamp, exterior, rarity, page]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("api/inventory?value=true");
      const data = await response.json();
      setInventoryValue(data.inventoryValue);
    }
    fetchData();
  }, []);

  return (
    <Container fluid>
      <Grid justify={"left"}>
        <Grid.Col xs={12} sm={6}>
          <Text>
            Inventory value: {Math.floor(inventoryValue * 100) / 100}$
          </Text>
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <Text>Inventory count: {inventoryCount}</Text>
        </Grid.Col>
      </Grid>
      <Grid align={"flex-end"}>
        <Grid.Col xs={6} sm={4} md={3}>
          <Select
            label="Sort"
            value={sortTimestamp}
            onChange={setSortTimestamp}
            data={[
              { value: true, label: "Latest" },
              { value: false, label: "Oldest" },
              {
                value: "price",
                label: "Price",
              },
            ]}
          />
        </Grid.Col>
        <Grid.Col xs={6} sm={4} md={3}>
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
        <Grid.Col xs={6} sm={4} md={3}>
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
        <Grid.Col xs={6} sm={4} md={3}>
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
        <Grid.Col span={6}>
          <Button
            fullWidth
            color={"red"}
            variant={sellLock ? "outline" : "filled"}
            onClick={() => setSellLock(!sellLock)}
          >
            {sellLock ? "Activate Sellmode" : "Deactive Sellmode"}
          </Button>
        </Grid.Col>
        <Grid.Col span={6}>
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
        <>
          <Grid mt={20}>
            <Grid.Col span={12}>
              <Center>
                <Pagination
                  onChange={setPage}
                  color={"orange"}
                  total={totalPages}
                  page={page}
                />
              </Center>
            </Grid.Col>
          </Grid>
          <Grid mt={20}>
            {skins.length > 0 &&
              skins.map((skin) => {
                return (
                  <Grid.Col key={skin._id} xs={6} md={4} xl={3}>
                    <SkinCard
                      id={skin._id}
                      classId={skin.classId}
                      name={skin.name}
                      iconUrl={skin.iconUrl}
                      price={skin.price}
                      rarity={skin.rarity}
                      rarityColor={skin.rarityColor}
                      float={skin.float}
                      statTrak={skin.statTrak}
                      knifeType={skin.knifeType}
                      type={skin.type}
                      souvenir={skin.souvenir}
                      deleteSkin={deleteSkin}
                      toggleMoneyUpdate={toggleMoneyUpdate}
                      sellLock={sellLock}
                    />
                  </Grid.Col>
                );
              })}
          </Grid>
          <Grid mt={20}>
            <Grid.Col span={12}>
              <Center>
                <Pagination
                  onChange={setPage}
                  color={"orange"}
                  total={totalPages}
                  page={page}
                />
              </Center>
            </Grid.Col>
          </Grid>
        </>
      )}
    </Container>
  );
}
