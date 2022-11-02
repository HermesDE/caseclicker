import { RingProgress, Center, Text } from "@mantine/core";
import { useState, useEffect } from "react";

export default function UpgradeRing({
  result,
  chance,
  finished,
  setFinished,
  under,
}) {
  console.log(result);
  const [outerSections, setOuterSections] = useState([
    { value: 100, color: "dark" },
  ]);
  const [innerSections, setInnerSections] = useState([
    { value: 100, color: "dark" },
  ]);

  useEffect(() => {
    if (chance) {
      if (under) {
        setOuterSections([
          { value: chance, color: "green" },
          { value: 100 - chance, color: "red" },
        ]);
      } else {
        setOuterSections([
          { value: 100 - chance, color: "red" },
          { value: chance, color: "green" },
        ]);
      }
    } else {
      setOuterSections([{ value: 100, color: "dark" }]);
    }
  }, [chance, under]);

  useEffect(() => {
    if (finished) {
      setOuterSections([{ value: 100, color: "dark" }]);
      setInnerSections([{ value: 100, color: "dark" }]);
      if (!result?.result) {
        setOuterSections([{ value: 100, color: "red" }]);
      }
    }
  }, [finished, result]);

  useEffect(() => {
    async function loadResult() {
      const timer = (ms) => new Promise((res) => setTimeout(res, ms));
      if (result) {
        console.log(result);
        const spins = Math.floor(Math.random() * (8 - 4 + 1) + 4);
        let frames;
        if (under) {
          frames = spins * 100 + result.random;
        } else {
          frames = spins * 100 + (100 - result.random);
        }

        let steps = 1;
        let j = 0;
        for (let i = frames; i >= 0; i -= steps) {
          setInnerSections([
            { value: 1 + j, color: "dark" },
            { value: 1, color: "yellow" },
            { value: 100 - j, color: "dark" },
          ]);
          if (i % 100 == 0) {
            j = 0;
            setInnerSections([{ value: 100, color: "dark" }]);
          }
          if (i <= 400) {
            steps -= 0.001245;
          }

          j += steps;
          await timer(5);
        }
        setFinished(true);
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
                  {finished && !result.result ? "You lost" : ""}
                  {chance ? `${chance}%` : ""}
                </Text>
              </Center>
            }
            size={330}
            sections={innerSections}
          />
        </Center>
      }
      size={350}
    />
  );
}
