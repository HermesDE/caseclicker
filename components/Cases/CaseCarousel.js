import { openModal, closeAllModals } from "@mantine/modals";
import { Center, Divider } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import sleep from "../../lib/sleep";
import UnboxedSkinCard from "./UnboxedSkinCard";
import { useMediaQuery } from "@mantine/hooks";
import Chance from "chance";
import Autoplay from "embla-carousel-autoplay";
import useSound from "use-sound";
import { useRef } from "react";

export default function CaseCarousel({
  unboxedSkin,
  slides,
  steps,
  toggleMoneyUpdate,
}) {
  const chance = new Chance();
  const autoplay = useRef(Autoplay({ delay: 100, stopOnLastSnap: true }));
  const [playRollSound] = useSound("/sounds/roll.mp3", { volume: 0.2 });
  const mobile = useMediaQuery("(max-width: 900px)");
  const alignNumber = chance.floating({ min: 0.31, max: 0.57, fixed: 2 }); //Math.random() * (0.57 - 0.31) + (0.31).toFixed(2);

  return (
    <>
      <Divider
        sx={{
          position: "absolute",
          height: "75%",
          zIndex: 1,
          display: "flex",
          left: "50%", //Math.floor(Math.random() * (0.57 - 0.31 + 1) + 0.31),
          marginTop: -20,
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
        align={alignNumber}
        withControls={false}
        height={150}
        mx={"auto"}
        loop={false}
        plugins={[autoplay.current]}
        speed={2}
        onSlideChange={async (i) => {
          if (i === 1) {
            toggleMoneyUpdate();
          }
          if (i % 2 === 0) {
            playRollSound();
          }
          if (i === steps.current - 1) {
            await sleep(5000);

            closeAllModals();
            openModal({
              title: "Look what you unboxed",
              children: (
                <Center>
                  <UnboxedSkinCard skin={unboxedSkin} />
                </Center>
              ),
              size: mobile ? "md" : "lg",
              transition: "slide-up",
              transitionDuration: 300,
            });
          }
        }}
      >
        {slides}
      </Carousel>
    </>
  );
}
