import { Button, Input } from "@mantine/core";
import { useEffect, useState } from "react";
import CaseBattleOverview from "../../components/Casino/CaseBattle/CaseBattleOverview";
import Navigation from "../../components/Navigation/Navigation";
import Head from "next/head";
import { showNotification } from "@mantine/notifications";

export default function Coinflip() {
  const [money, setMoney] = useState(0);
  const [update, setUpdate] = useState(false);
  const [tokens, setTokens] = useState(0);

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
        <title>Case Battle | Case Clicker Online</title>
      </Head>
      <Navigation money={money}>
        <CaseBattleOverview
          money={money}
          toggleMoneyUpdate={toggleMoneyUpdate}
        />
      </Navigation>
    </>
  );
}
