import { Carousel } from "@mantine/carousel";
import { Container, Grid, Title, createStyles } from "@mantine/core";
import { useEffect, useState } from "react";
import OfferSkinCard from "./OfferSkinCard";

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

  const deleteOffer = (id) => {
    setLatestOffers(latestOffers.filter((offer) => offer._id !== id));
    setExpensiveOffers(expensiveOffers.filter((offer) => offer._id !== id));
  };

  return (
    <Container fluid mt={30}>
      {latestOffers.length > 0 && (
        <>
          <Title order={2}>Latest offers</Title>
          <Carousel
            classNames={classes}
            slideSize={"33.333333%"}
            slideGap="md"
            loop
            align={"start"}
            //slidesToScroll={3}
            withIndicators
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
                  />
                </Carousel.Slide>
              );
            })}
          </Carousel>
        </>
      )}
    </Container>
  );
}
