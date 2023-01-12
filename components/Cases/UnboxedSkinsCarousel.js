import { Carousel } from "@mantine/carousel";
import { Center } from "@mantine/core";
import UnboxedSkinCard from "./UnboxedSkinCard";

export default function UnboxedSkinsCarousel({ skins }) {
  return skins.length === 1 ? (
    <Center>
      <UnboxedSkinCard skin={skins[0]} playSound={true} />
    </Center>
  ) : (
    <Carousel
      mx={"auto"}
      withIndicators={skins.length > 3}
      withControls={skins.length > 3}
      height={400}
      align={"start"}
      dragFree
      slideSize={skins.length === 1 ? "100%" : "33.333333%"}
      slideGap="md"
      breakpoints={[
        {
          maxWidth: "xs",
          slideSize: "100%",
        },
        {
          minWidth: "xs",
          slideSize: "100%",
        },
        {
          minWidth: "sm",
          slideSize: skins.length === 1 ? "100%" : "50%",
        },
        {
          minWidth: "xl",
          slideSize: skins.length === 1 ? "100%" : "33.333333%",
        },
      ]}
    >
      {skins.map((skin, i) => {
        return (
          <Carousel.Slide key={skin._id}>
            <UnboxedSkinCard skin={skin} playSound={i === 0} />
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
}
