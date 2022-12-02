import {
  Card,
  Text,
  Center,
  Badge,
  Image,
  Group,
  ActionIcon,
} from "@mantine/core";
import { useCounter } from "@mantine/hooks";
import { useMemo } from "react";

export default function SelectCase({
  c,
  selectedCases,
  setSelectedCases,
  handleCaseIncrement,
  handleCaseDecrement,
}) {
  const [counter, handlers] = useCounter(0, { min: 0, max: 10 });

  return (
    <Card>
      <Group grow>
        <Image src={`/pictures/cases/${c.iconUrl}`} width={50} />
        <Text weight={500}>{c.name}</Text>
        <Badge size="lg" color={"red"}>
          {c.price + " $"}
        </Badge>
        <Group>
          <ActionIcon
            disabled={counter === 0}
            onClick={() => {
              handlers.decrement();
              handleCaseDecrement(c);
            }}
          >
            -
          </ActionIcon>
          <ActionIcon
            disabled={counter === 10}
            onClick={() => {
              handlers.increment();
              handleCaseIncrement(c);
            }}
          >
            +
          </ActionIcon>
          <Text>{counter}</Text>
        </Group>
      </Group>
    </Card>
  );
}
