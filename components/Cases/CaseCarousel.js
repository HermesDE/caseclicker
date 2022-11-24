import { openModal, closeAllModals } from "@mantine/modals";
import { Divider } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import sleep from "../../lib/sleep";
import UnboxedSkinCard from "./UnboxedSkinCard";

export default function CaseCarousel({
  unboxedSkin,
  slides,
  steps,
  autoplay,
  playRollSound,
  toggleMoneyUpdate,
}) {
  return (
    <>
      <Divider
        sx={{
          position: "absolute",
          height: "75%",
          zIndex: 1,
          display: "flex",
          left: Math.floor(Math.random() * (55 - 40 + 1) + 40) + "%",
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
        align={"center"}
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
              children: <UnboxedSkinCard skin={unboxedSkin} />,
              size: "lg",
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
