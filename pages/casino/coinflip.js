import { Button, Input } from "@mantine/core";
import { useEffect, useState } from "react";
import CoinflipOverview from "../../components/Casino/Coinflip/CoinflipOverview";
import Navigation from "../../components/Navigation/Navigation";
import Head from "next/head";

export default function Coinflip() {
  const [money, setMoney] = useState(0);
  const [update, setUpdate] = useState(false);
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/me");

      if (!response.ok) {
        showNotification({
          title: "Error",
          message: `Error while fetching user information\nError Message: ${response.status} ${response.statusText}`,
        });
        return;
      }
      const data = await response.json();
      setMoney(data.money);
      setTokens(data.tokens);
    }
    fetchData();
  }, [update]);

  const toggleMoneyUpdate = () => {
    setUpdate(!update);
  };
  return (
    <>
      <Head>
        <title>Coinflip | Case Clicker</title>
      </Head>
      <Navigation money={money}>
        <CoinflipOverview tokens={tokens} />
      </Navigation>
    </>
  );
}
