import {
  ActionIcon,
  Badge,
  Card,
  Center,
  Grid,
  Group,
  Image,
  Indicator,
  Text,
} from "@mantine/core";
import { useState, useEffect } from "react";

export default function CaseSelectorModal({
  selectedCases,
  setSelectedCases,
  userOpenedCases,
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

  const handleAddCase = (id) => {
    setSelectedCases((current) => [...current, id]);
  };

  return (
    <Grid gutter={"sm"} grow>
      {cases.map((c) => {
        return (
          <Grid.Col span={3}>
            <Card withBorder>
              <Center>
                <Indicator
                  color={"blue"}
                  size={20}
                  label={() =>
                    selectedCases.filter((sc) => sc === c._id).length
                  }
                >
                  <Image src={`/pictures/cases/${c.iconUrl}`} width={100} />
                </Indicator>
              </Center>

              <Center>
                <Text weight={500}>{c.name + "$"}</Text>
              </Center>
              <Group position="center">
                <ActionIcon onClick={() => handleRemoveCase(c._id)}>
                  -
                </ActionIcon>
                <Badge color={"red"}>{c.price}</Badge>
                <ActionIcon onClick={() => handleAddCase(c._id)}>+</ActionIcon>
              </Group>
            </Card>
          </Grid.Col>
        );
      })}
    </Grid>
  );
}
