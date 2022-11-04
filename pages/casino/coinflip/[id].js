import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navigation from "../../../components/Navigation/Navigation";
import Head from "next/head";
import { Avatar, Container, Grid } from "@mantine/core";
import PlayerHostCard from "../../../components/Casino/Coinflip/PlayerHostCard";
import PlayerGuestCard from "../../../components/Casino/Coinflip/PlayerGuestCard";

export default function CoinflipGame() {
  const router = useRouter();
  const { id } = router.query;
  const [game, setGame] = useState();
  const [finished, setFinished] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/casino/coinflip?id=${id}`);
      if (response.ok) {
        setGame(await response.json());
      }
    }
    const interval = setInterval(() => {
      if (game?.status === "closed") return clearInterval(interval);
      if (router.isReady) {
        fetchData();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [router.isReady, id, game?.status]);

  useEffect(() => {
    if (game?.status === "closed") {
      setStartAnimation(true);
    }
  }, [game?.status]);

  return (
    <>
      <Head>
        <title>Coinflip | Case Clicker Online</title>
      </Head>
      <Navigation>
        <Container fluid>
          {game ? (
            <Grid mt={100}>
              <Grid.Col span={4}>
                <PlayerHostCard host={game.host} bet={game.bet} />
              </Grid.Col>
              {startAnimation && (
                <Grid.Col span={4}>
                  <div id="coin" className="coin">
                    <div className="host">
                      <Avatar size={100} src={game.host.picture} />
                    </div>
                    <div className="guest">
                      <Avatar size={100} src={game.guest.picture} />
                    </div>
                  </div>
                </Grid.Col>
              )}
              {game.status === "open" && <Grid.Col span={4}></Grid.Col>}
              <Grid.Col span={4}>
                <PlayerGuestCard guest={game.guest} bet={game.bet} />
              </Grid.Col>
            </Grid>
          ) : (
            ""
          )}
        </Container>
      </Navigation>
    </>
  );
}
