import { useState, useEffect } from "react";
import { showNotification } from "@mantine/notifications";
import Navigation from "../components/Navigation/Navigation";
import MarketplaceOverview from "../components/Marketplace/MarketplaceOverview";
import Head from "next/head";

export default function Marketplace() {
  const [money, setMoney] = useState(0);
  const [update, setUpdate] = useState(false);

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
    }
    fetchData();
  }, [update]);

  const toggleMoneyUpdate = () => {
    setUpdate(!update);
  };
  return (
    <>
      <Head>
        <title>Marketplace | Case Clicker Online</title>
      </Head>
      <Navigation money={money}>
        <MarketplaceOverview
          toggleMoneyUpdate={toggleMoneyUpdate}
          money={money}
        />
      </Navigation>
    </>
  );
}
