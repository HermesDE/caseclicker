import { openModal, closeAllModals } from "@mantine/modals";
import { Center, Divider, Grid } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import sleep from "../../lib/sleep";
import UnboxedSkinCard from "./UnboxedSkinCard";
import { useMediaQuery } from "@mantine/hooks";
import Chance from "chance";
import Autoplay from "embla-carousel-autoplay";
import useSound from "use-sound";
import { useRef, useEffect, useState } from "react";
import UnboxedSkinsCarousel from "./UnboxedSkinsCarousel";
import sortSkinsByRarity from "../../lib/sortSkinsByRarity";

export default function CaseCarousel({
  unboxedSkins,
  slides,
  steps,
  toggleMoneyUpdate,
}) {
  const autoplaysRef = useRef([]);
  const aligns = useRef([]);
  const chance = new Chance();
  const [playRollSound] = useSound("/sounds/roll.mp3", { volume: 0.2 });

  for (let i = 0; i < slides.length; i++) {
    autoplaysRef.current.push(Autoplay({ delay: 100, stopOnLastSnap: true }));
    const alignNumber = chance.floating({ min: 0.31, max: 0.57, fixed: 2 }); //Math.random() * (0.57 - 0.31) + (0.31).toFixed(2);
    aligns.current.push(alignNumber);
  }

  return (
    <>
      {slides.map((slide, j) => {
        return (
          <Grid key={j}>
            <Grid.Col span={12}>
              <Divider
                sx={{
                  position: "absolute",
                  height: 160,
                  zIndex: 1,
                  display: "flex",
                  left: "50%", //Math.floor(Math.random() * (0.57 - 0.31 + 1) + 0.31),
                  marginTop: -10,
                }}
                orientation="vertical"
                size={"sm"}
                color={"yellow"}
              />
              <Carousel
                dragFree={false}
                draggable={false}
                slideSize={"25%"}
                slideGap="sm"
                align={aligns.current[j]}
                withControls={false}
                height={150}
                mx={"auto"}
                loop={false}
                plugins={[autoplaysRef.current[j]]}
                speed={2}
                onSlideChange={async (i) => {
                  if (i === 1) {
                    toggleMoneyUpdate();
                  }
                  if (j === 0) {
                    if (i % 2 === 0) {
                      playRollSound();
                    }
                  }

                  if (i === steps.current - 1) {
                    if (j !== 0) return;
                    await sleep(5000);

                    closeAllModals();
                    const sortedSkins = await sortSkinsByRarity(unboxedSkins);
                    openModal({
                      title: "Look what you unboxed",
                      children: <UnboxedSkinsCarousel skins={sortedSkins} />,
                      size: unboxedSkins.length === 1 ? "xl" : "100%",
                      transition: "slide-up",
                      transitionDuration: 300,
                    });
                  }
                }}
              >
                {slide}
              </Carousel>
            </Grid.Col>
          </Grid>
        );
      })}
    </>
  );
}
