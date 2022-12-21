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
  unboxedSkin,
  toggleMoneyUpdate,
}) {
  const [pickedSkingroups, setPickedSkingroups] = useState([]);
  const [pickedSkins, setPickedSkins] = useState([]);
  const [slides, setSlides] = useState([]);
  const slidesRef = useRef([]);
  const steps = useRef(50);

  useEffect(() => {
    let skingroupArray = [];
    for (let i = 0; i < steps.current; i++) {
      skingroupArray.push(weightedRandom(skingroups));
    }
    setPickedSkingroups(skingroupArray);
  }, [skingroups, unboxedSkin]);

  useEffect(() => {
    let skinArray = [];
    for (const [i, skingroup] of pickedSkingroups.entries()) {
      if (i === steps.current - 6) {
        skinArray.push(unboxedSkin);
        continue;
      }
      let s = skins.filter((skin) => skin.skingroup === skingroup);
      var skin = s[Math.floor(Math.random() * s.length)];
      skinArray.push(skin);
    }
    setPickedSkins(skinArray);
  }, [pickedSkingroups, unboxedSkin, skins]);

  useEffect(() => {
    if (pickedSkins[0] === undefined) return;
    slidesRef.current = pickedSkins.map((skin, i) => {
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
    setSlides(slidesRef.current);
  }, [pickedSkins]);

  return (
    <CaseCarousel
      unboxedSkin={unboxedSkin}
      slides={slides}
      steps={steps}
      toggleMoneyUpdate={toggleMoneyUpdate}
    />
  );
}
