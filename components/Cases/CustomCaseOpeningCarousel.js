import { useEffect, useState, useRef } from "react";
import CaseCarousel from "./CaseCarousel";
import { Carousel } from "@mantine/carousel";
import { Card, Divider, Image } from "@mantine/core";

const weightedRandom = (values) => {
  let i,
    pickedValue,
    randomNr = Math.random(),
    threshold = 0;

  for (i = 0; i < values.length; i++) {
    threshold += values[i].percentage / 100;
    if (threshold > randomNr) {
      pickedValue = values[i].skingroup;
      break;
    }
  }

  return pickedValue;
};

export default function CustomCaseOpeningCarousel({
  skins,
  skingroups,
  unboxedSkins,
  toggleMoneyUpdate,
}) {
  const [pickedSkingroups, setPickedSkingroups] = useState([]);
  const pickedSkingroupsRef = useRef([]);
  const [pickedSkins, setPickedSkins] = useState([]);
  const pickedSkinsRef = useRef([]);
  const [slides, setSlides] = useState([]);
  const slidesRef = useRef([]);
  const steps = useRef(50);

  useEffect(() => {
    if (unboxedSkins.length <= 0) return;

    for (let j = 0; j < unboxedSkins.length; j++) {
      let skingroupArray = [];
      for (let i = 0; i < steps.current; i++) {
        skingroupArray.push(weightedRandom(skingroups));
      }
      pickedSkingroupsRef.current.push(skingroupArray);
    }
    setPickedSkingroups(pickedSkingroupsRef.current);
  }, [skingroups, unboxedSkins]);

  useEffect(() => {
    for (let j = 0; j < pickedSkingroups.length; j++) {
      let skinArray = [];
      for (const [i, skingroup] of pickedSkingroups[j].entries()) {
        if (i === steps.current - 6) {
          skinArray.push(unboxedSkins[j]);
          continue;
        }
        let s = skins.filter((skin) => skin.skingroup === skingroup);
        let skin = s[Math.floor(Math.random() * s.length)];
        skinArray.push(skin);
      }
      pickedSkinsRef.current.push(skinArray);
    }
    setPickedSkins(pickedSkinsRef.current);
  }, [pickedSkingroups, unboxedSkins, skins]);

  useEffect(() => {
    for (let j = 0; j < pickedSkins.length; j++) {
      if (pickedSkins[j][0] === undefined) return;

      const s = pickedSkins[j].map((skin, i) => {
        return (
          <Carousel.Slide key={i}>
            <Card>
              <Card.Section>
                <Image
                  alt={skin.name}
                  fit="contain"
                  src={`https://steamcommunity-a.akamaihd.net/economy/image/${skin.iconUrl}`}
                />
              </Card.Section>
              <Card.Section>
                <Divider color={`#${skin.rarityColor}`} size="lg" />
              </Card.Section>
            </Card>
          </Carousel.Slide>
        );
      });
      slidesRef.current.push(s);
    }

    setSlides(slidesRef.current);
  }, [pickedSkins]);

  return (
    <CaseCarousel
      unboxedSkins={unboxedSkins}
      slides={slides}
      steps={steps}
      toggleMoneyUpdate={toggleMoneyUpdate}
    />
  );
}
