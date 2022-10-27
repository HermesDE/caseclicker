import {
  Accordion,
  Center,
  Container,
  Grid,
  Loader,
  Title,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import UserOfferSkinCard from "./UserOfferSkinCard";

export default function UserOffers() {
  const [userOffers, setUserOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/marketplace?userOffers=true");
      if (!response.ok) {
        return showNotification({
          title: "Error",
          message: "Error while fetching your offers",
          color: "red",
        });
      }
      setUserOffers(await response.json());
    }
    fetchData();
    setLoading(false);
  }, []);

  const deleteOffer = (id) => {
    setUserOffers(userOffers.filter((skin) => skin._id !== id));
  };

  return (
    <Container fluid>
      <Grid justify={"center"}>
        <Grid.Col>
          {loading ? (
            <Loader size={"xl"} color="orange" />
          ) : (
            <Title>Marketplace</Title>
          )}
        </Grid.Col>
      </Grid>

      {userOffers.length > 0 && (
        <Accordion mt={10} chevronPosition="left" defaultValue={"useroffers"}>
          <Accordion.Item value="useroffers">
            <Accordion.Control>Your offers</Accordion.Control>
            <Accordion.Panel>
              <Grid>
                {userOffers.map((offer) => {
                  return (
                    <Grid.Col key={offer._id} span={4}>
                      <UserOfferSkinCard
                        id={offer._id}
                        offeredAt={offer.offeredAt}
                        openedSkin={offer.openedSkin}
                        price={offer.price}
                        userId={offer.userId}
                        deleteOffer={deleteOffer}
                      />
                    </Grid.Col>
                  );
                })}
              </Grid>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      )}
    </Container>
  );
}
