import Navigation from "../components/Navigation/Navigation";
import Head from "next/head";
import CasinoOverview from "../components/Casino/CasinoOverview";
import UserContext from "../components/Context/UserContext";
import { useContext } from "react";

export default function Casino() {
  const { toggleMoneyUpdate, money, tokens, setTokens } =
    useContext(UserContext);
  return (
    <>
      <Head>
        <title>Casino | Case Clicker Online</title>
        <meta name="description" content="gamble with your skins" />
      </Head>
      <Navigation>
        <CasinoOverview
          toggleMoneyUpdate={toggleMoneyUpdate}
          money={money}
          tokens={tokens}
          setTokens={setTokens}
        />
      </Navigation>
      ;
    </>
  );
}
