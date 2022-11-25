import { Carousel } from "@mantine/carousel";
import { Container, Grid, Title, createStyles, Accordion } from "@mantine/core";
import { useEffect, useState, useRef } from "react";
import OfferSkinCard from "./OfferSkinCard";
import Autoplay from "embla-carousel-autoplay";

const useStyles = createStyles((_theme, _params, getRef) => ({
  controls: {
    ref: getRef("controls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  root: {
    "&:hover": {
      [`& .${getRef("controls")}`]: {
        opacity: 1,
      },
    },
  },
}));

export default function Offers({ toggleMoneyUpdate, money }) {
  const [latestOffers, setLatestOffers] = useState([]);
  const [expensiveOffers, setExpensiveOffers] = useState([]);
  const { classes } = useStyles();

  const autoplayLatest = useRef(Autoplay({ delay: 3000 }));
  const autoplayExpensive = useRef(Autoplay({ delay: 3000 }));

  const [updateTime, setUpdateTime] = useState(false);

  useEffect(() => {
    async function fetchLatestOffers() {
      const response = await fetch("/api/marketplace?tag=latest");
      if (!response.ok) return;
      setLatestOffers(await response.json());
    }
    async function fetchExpensiveOffers() {
      const response = await fetch("/api/marketplace?tag=price");
      if (!response.ok) return;
      setExpensiveOffers(await response.json());
    }
    fetchLatestOffers();
    fetchExpensiveOffers();
  }, []);

  useEffect(() => {
    const interval = setTimeout(() => {
      setUpdateTime(!updateTime);
    }, 3000);
    return () => clearTimeout(interval);
  }, [updateTime]);

  const deleteOffer = (id) => {
    setLatestOffers(latestOffers.filter((offer) => offer._id !== id));
    setExpensiveOffers(expensiveOffers.filter((offer) => offer._id !== id));
  };

  return (
    <Container fluid mt={30}>
      <Accordion
        chevronPosition="left"
        multiple
        defaultValue={["latest", "expensive"]}
      >
        {latestOffers.length > 0 && (
          <Accordion.Item value="latest">
            <Accordion.Control>Latest offers</Accordion.Control>
            <Accordion.Panel>
              <Carousel
                classNames={classes}
                slideSize={"33.333333%"}
                slideGap="md"
                loop
                align={"start"}
                //slidesToScroll={3}
                withIndicators
                plugins={[autoplayLatest.current]}
                onMouseEnter={autoplayLatest.current.stop}
                onMouseLeave={autoplayLatest.current.play}
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
                    slideSize: "50%",
                  },
                  {
                    minWidth: "xl",
                    slideSize: "33.33333%",
                  },
                ]}
              >
                {latestOffers.map((offer) => {
                  return (
                    <Carousel.Slide key={offer._id}>
                      <OfferSkinCard
                        openedSkin={offer.openedSkin}
                        offeredAt={offer.offeredAt}
                        price={offer.price}
                        id={offer._id}
                        toggleMoneyUpdate={toggleMoneyUpdate}
                        deleteOffer={deleteOffer}
                        money={money}
                        updateTime={updateTime}
                      />
                    </Carousel.Slide>
                  );
                })}
              </Carousel>
            </Accordion.Panel>
          </Accordion.Item>
        )}
        {expensiveOffers.length > 0 && (
          <Accordion.Item value="expensive">
            <Accordion.Control>Most expensive offers</Accordion.Control>
            <Accordion.Panel>
              <Carousel
                classNames={classes}
                slideSize={"33.333333%"}
                slideGap="md"
                loop
                align={"start"}
                //slidesToScroll={3}
                withIndicators
                plugins={[autoplayExpensive.current]}
                onMouseEnter={autoplayExpensive.current.stop}
                onMouseLeave={autoplayExpensive.current.play}
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
                    slideSize: "50%",
                  },
                  {
                    minWidth: "xl",
                    slideSize: "33.33333%",
                  },
                ]}
              >
                {expensiveOffers.map((offer) => {
                  return (
                    <Carousel.Slide key={offer._id}>
                      <OfferSkinCard
                        openedSkin={offer.openedSkin}
                        offeredAt={offer.offeredAt}
                        price={offer.price}
                        id={offer._id}
                        toggleMoneyUpdate={toggleMoneyUpdate}
                        deleteOffer={deleteOffer}
                        money={money}
                        updateTime={updateTime}
                      />
                    </Carousel.Slide>
                  );
                })}
              </Carousel>
            </Accordion.Panel>
          </Accordion.Item>
        )}
      </Accordion>
    </Container>
  );
}
