import { Button, Input } from "@mantine/core";
import { useEffect, useState } from "react";
import CaseBattleOverview from "../../components/Casino/CaseBattle/CaseBattleOverview";
import Navigation from "../../components/Navigation/Navigation";
import Head from "next/head";
import { showNotification } from "@mantine/notifications";

export default function Casebattle({
  toggleMoneyUpdate,
  money,
  setMoney,
  moneyPerClick,
  setMoneyPerClick,
  tokens,
  setTokens,
  userOpenedCases,
  setUserOpenedCases,
}) {
  return (
    <>
      <Head>
        <title>Case Battle | Case Clicker Online</title>
      </Head>
      <Navigation money={money}>
        <CaseBattleOverview
          userOpenedCases={userOpenedCases}
          money={money}
          toggleMoneyUpdate={toggleMoneyUpdate}
        />
      </Navigation>
    </>
  );
}
