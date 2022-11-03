import Navigation from "../components/Navigation/Navigation";
import { useState, useEffect } from "react";
import Head from "next/head";
import CasinoOverview from "../components/Casino/CasinoOverview";

export default function Casino() {
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
        <title>Casino | Case Clicker</title>
      </Head>
      <Navigation money={money}>
        <CasinoOverview
          toggleMoneyUpdate={toggleMoneyUpdate}
          money={money}
          tokens={tokens}
        />
      </Navigation>
      ;
    </>
  );
}
