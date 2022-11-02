import { RingProgress, Center, Text } from "@mantine/core";
import { useState, useEffect } from "react";
import useSound from "use-sound";

export default function UpgradeRing({
  result,
  chance,
  finished,
  setFinished,
  under,
  loose,
}) {
  const [outerSections, setOuterSections] = useState([
    { value: 100, color: "dark" },
  ]);
  const [innerSections, setInnerSections] = useState([
    { value: 100, color: "dark" },
  ]);
  const [sound] = useSound("/sounds/click.mp3", { volume: 0.01 });

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
        const spins = Math.floor(Math.random() * (8 - 4 + 1) + 4);
        let frames;
        let soundSteps = 0;
        let everyXSound = 25;
        if (under) {
          frames = spins * 100 + result.random;
        } else {
          frames = spins * 100 + (100 - result.random);
        }

        let steps = 1;
        let j = 0;
        let previousInt;
        for (let i = frames; i >= 0; i -= steps) {
          setInnerSections([
            { value: 1 + j, color: "dark" },
            { value: 1, color: "yellow" },
            { value: 100 - j, color: "dark" },
          ]);
          //generate sound
          let parsedI = parseInt(i);
          if (parsedI !== previousInt && parsedI % everyXSound == 0) {
            previousInt = parsedI;
            sound();
          }
          //slow down inner spinner
          if (i <= 400) {
            steps -= 0.001245;
          }

          soundSteps++;
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
                  {chance ? `${chance}%` : loose ? "You lost!" : ""}
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
