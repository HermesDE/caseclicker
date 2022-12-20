import { Grid, Select, Button } from "@mantine/core";

export default function InventoryFilter({
  sortTimestamp,
  setSortTimestamp,
  exterior,
  setExterior,
  rarity,
  setRarity,
}) {
  return (
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
            "Consumer Grade",
            "Industrial Grade",
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
  );
}
