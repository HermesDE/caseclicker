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
  TextInput,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import SearchIcon from "../icons/SearchIcon";
import CustomSell from "./CustomSell";
import SearchInput from "./SearchInput";
import SkinCard from "./SkinCard";
import InventoryFilter from "./InventoryFilter";

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
  const [cardSize] = useLocalStorage({
    key: "cardSize",
    defaultValue: "normal",
  });
  const [search, setSearch] = useState("");
  const [sellLock, setSellLock] = useState(false);
  const [inventoryValue, setInventoryValue] = useState(0);
  const [inventoryCount, setInventoryCount] = useState(0);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const deleteSkin = (id) => {
    setSkins(skins.filter((skin) => skin._id !== id));
  };

  useEffect(() => {
    if (page > 1) setPage(1);
  }, [search]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch(
        `/api/inventory?page=${page}&sort=${sortTimestamp}&search=${search}${
          exterior ? `&exterior=${exterior}` : ""
        }${rarity ? `&rarity=${rarity}` : ""}`
      );
      if (!response.ok && response.status !== 401) {
        showNotification({
          title: "Error",
          message: `Error while fetching inventory\nError Message: ${response.status} ${response.statusText}`,
          color: "red",
        });

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
  }, [sortTimestamp, exterior, rarity, page, search]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("api/inventory?value=true");
      const data = await response.json();
      setInventoryValue(data.inventoryValue);
    }
    fetchData();
  }, []);

  const filterProps = {
    sortTimestamp,
    setSortTimestamp,
    exterior,
    setExterior,
    rarity,
    setRarity,
  };

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
      <InventoryFilter {...filterProps} />
      <Grid mt={10}>
        {/* <Grid.Col span={6}>
          <Button
            fullWidth
            color={"red"}
            variant={sellLock ? "outline" : "filled"}
            onClick={() => setSellLock(!sellLock)}
          >
            {sellLock ? "Activate Sellmode" : "Deactive Sellmode"}
          </Button>
        </Grid.Col> */}
        <Grid.Col span={6}>
          <Button
            color={"red"}
            variant={"light"}
            fullWidth
            onClick={() =>
              openModal({
                title: "Custom sell / convert",
                children: <CustomSell toggleMoneyUpdate={toggleMoneyUpdate} />,
                size: "xl",
              })
            }
          >
            Open custom sell / convert
          </Button>
        </Grid.Col>
      </Grid>
      <SearchInput mt={10} setSearch={setSearch} />
      {loading || !cardSize ? (
        <Center>
          <Loader mt={20} size={"xl"} color="orange" />
        </Center>
      ) : skins?.length <= 0 ? (
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

          <Grid mt={20} grow gutter={cardSize === "small" ? "xs" : "md"}>
            {skins?.length > 0 &&
              skins.map((skin) => {
                return (
                  <Grid.Col
                    key={skin._id}
                    span={cardSize === "small" ? "content" : 12}
                    xs={cardSize === "small" ? "content" : 6}
                    md={cardSize === "small" ? "content" : 4}
                    xl={cardSize === "small" ? "content" : 3}
                  >
                    <SkinCard
                      id={skin._id}
                      classId={skin.classId}
                      name={skin.name}
                      iconUrl={skin.iconUrl}
                      price={skin.price}
                      exterior={skin.exterior}
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
                      size={cardSize}
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
