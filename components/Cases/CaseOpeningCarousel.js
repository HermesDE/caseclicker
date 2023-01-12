import { Carousel } from "@mantine/carousel";
import { Card, Divider, Image } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

import CaseCarousel from "./CaseCarousel";

const pickRandomSkin = (skins) => {
  let skin;
  if (!skins?.blueSkins?.length) return;
  const randomRarity = Math.floor(Math.random() * 1000) + 1;
  if (randomRarity <= 800) {
    skin =
      skins.blueSkins[Math.floor(Math.random() * skins?.blueSkins?.length)];
  } else if (randomRarity <= 960) {
    skin =
      skins.violetSkins[Math.floor(Math.random() * skins?.violetSkins?.length)];
  } else if (randomRarity <= 990) {
    skin =
      skins.pinkSkins[Math.floor(Math.random() * skins?.pinkSkins?.length)];
  } else if (randomRarity <= 1000) {
    skin = skins.redSkins[Math.floor(Math.random() * skins?.redSkins?.length)];
  }
  return skin;
};

export default function CaseOpeningCarousel({
  skins,
  unboxedSkins,
  toggleMoneyUpdate,
}) {
  const sortedSkins = useRef({});
  const [pickedSkins, setPickedSkins] = useState([]);
  const [slides, setSlides] = useState([]);
  const pickedSkinsRef = useRef([]);
  const slidesRef = useRef([]);
  const steps = useRef(50);

  useEffect(() => {
    const blueSkins = skins.filter((skin) => skin.rarity === "Mil-Spec Grade");
    const violetSkins = skins.filter((skin) => skin.rarity === "Restricted");
    const pinkSkins = skins.filter((skin) => skin.rarity === "Classified");
    const redSkins = skins.filter((skin) => skin.rarity === "Covert");

    sortedSkins.current = { blueSkins, violetSkins, pinkSkins, redSkins };
  }, [skins]);

  useEffect(() => {
    if (unboxedSkins.length <= 0) return;

    for (let j = 0; j < unboxedSkins.length; j++) {
      let skinArray = [];
      for (let i = 0; i < steps.current; i++) {
        if (i === steps.current - 6) {
          skinArray.push(unboxedSkins[j]);
          continue;
        }
        skinArray.push(pickRandomSkin(sortedSkins.current));
      }
      pickedSkinsRef.current.push(skinArray);
    }
    setPickedSkins(pickedSkinsRef.current);
  }, [sortedSkins.current, unboxedSkins]);

  useEffect(() => {
    //if (pickedSkins.length <= 0) return;
    for (let i = 0; i < pickedSkins.length / 2; i++) {
      if (pickedSkins[i][0] === undefined) return;
      const s = pickedSkins[i].map((skin, i) => {
        let image, color;
        if (skin.weaponType === "Knife" || skin.type === "Gloves") {
          image = "/pictures/skins/rareItem.webp";
          color = "#ffd700";
        } else {
          image = `https://steamcommunity-a.akamaihd.net/economy/image/${skin.iconUrl}`;
          color = "#" + skin.rarityColor;
        }
        return (
          <Carousel.Slide key={i}>
            <Card>
              <Card.Section>
                <Image alt={skin.name} fit="contain" src={image} />
              </Card.Section>
              <Card.Section>
                <Divider color={color} size="lg" />
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
