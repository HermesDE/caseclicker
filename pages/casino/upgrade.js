import UpgradeOverview from "../../components/Casino/Upgrade/UpgradeOverview";
import Navigation from "../../components/Navigation/Navigation";
import Head from "next/head";
import { useState, useEffect } from "react";
import { showNotification } from "@mantine/notifications";

export default function Upgrade() {
  const [money, setMoney] = useState(0);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/me");

      if (!response.ok) {
        if (response.status !== 401) {
          showNotification({
            title: "Error",
            message: `Error while fetching user information\nError Message: ${response.status} ${response.statusText}`,
          });
        }

        return;
      }
      const data = await response.json();
      setMoney(data.money);
    }
    fetchData();
  }, [update]);
  return (
    <>
      <Head>
        <title>Casino Upgrade | Case Clicker Online</title>
      </Head>
      <Navigation money={money}>
        <UpgradeOverview />
      </Navigation>
    </>
  );
}
