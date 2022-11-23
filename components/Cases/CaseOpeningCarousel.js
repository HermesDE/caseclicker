import { Carousel } from "@mantine/carousel";
import { Card, Divider, Image } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useSound from "use-sound";
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
  unboxedSkin,
  toggleMoneyUpdate,
}) {
  const [sortedSkins, setSortedSkins] = useState({});
  const [pickedSkins, setPickedSkins] = useState([]);
  const [slides, setSlides] = useState([]);
  const slidesRef = useRef([]);
  const steps = useRef(50);

  const autoplay = useRef(Autoplay({ delay: 100, stopOnLastSnap: true }));
  const [playRollSound] = useSound("/sounds/roll.mp3", { volume: 0.2 });

  useEffect(() => {
    const blueSkins = skins.filter((skin) => skin.rarity === "Mil-Spec Grade");
    const violetSkins = skins.filter((skin) => skin.rarity === "Restricted");
    const pinkSkins = skins.filter((skin) => skin.rarity === "Classified");
    const redSkins = skins.filter((skin) => skin.rarity === "Covert");

    setSortedSkins({ blueSkins, violetSkins, pinkSkins, redSkins });
  }, [skins]);

  useEffect(() => {
    let skinArray = [];
    for (let i = 0; i < steps.current; i++) {
      if (i === steps.current - 6) {
        skinArray.push(unboxedSkin);
        continue;
      }
      skinArray.push(pickRandomSkin(sortedSkins));
    }
    setPickedSkins(skinArray);
  }, [sortedSkins, unboxedSkin]);

  useEffect(() => {
    if (pickedSkins[0] === undefined) return;
    slidesRef.current = pickedSkins.map((skin, i) => {
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
    setSlides(slidesRef.current);
  }, [pickedSkins]);

  return (
    <CaseCarousel
      unboxedSkin={unboxedSkin}
      slides={slides}
      steps={steps}
      autoplay={autoplay}
      playRollSound={playRollSound}
      toggleMoneyUpdate={toggleMoneyUpdate}
    />
  );
}
