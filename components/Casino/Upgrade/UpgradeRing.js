import { RingProgress, Center, Text } from "@mantine/core";
import { useState, useEffect } from "react";

export default function UpgradeRing({ result, chance }) {
  const [outerSections, setOuterSections] = useState([
    { value: 100, color: "dark" },
  ]);
  const [innerSections, setInnerSections] = useState([
    { value: 100, color: "dark" },
  ]);

  useEffect(() => {
    if (chance) {
      setOuterSections([
        { value: chance, color: "green" },
        { value: 100 - chance, color: "red" },
      ]);
    } else {
      setOuterSections([{ value: 100, color: "dark" }]);
    }
  }, [chance]);

  useEffect(() => {
    async function loadResult() {
      const timer = (ms) => new Promise((res) => setTimeout(res, ms));
      if (result) {
        const spins = Math.floor(Math.random() * (4 - 2 + 1) + 2);
        for (let i = 0; i < spins; i++) {
          for (let j = 1; j < 100; j++) {
            setInnerSections([
              { value: j - 1, color: "dark" },
              { value: 1, color: "yellow" },
              { value: 100 - j, color: "dark" },
            ]);
            await timer(20);
          }
          setInnerSections([{ value: 100, color: "dark" }]);
        }
        for (let i = 0; i < result.random; i++) {
          setInnerSections([
            { value: i - 1, color: "dark" },
            { value: 1, color: "yellow" },
            { value: 100 - i, color: "dark" },
          ]);
          await timer(20);
        }
      }
    }
    loadResult();
  }, [result]);
  return (
    <RingProgress
      sections={outerSections}
      label={
        <Center>
          <RingProgress
            label={
              <Center>
                <Text size={"xl"} weight="500">
                  {chance ? `${chance}%` : ""}
                </Text>
              </Center>
            }
            size={300}
            sections={innerSections}
          />
        </Center>
      }
      size={350}
    />
  );
}
