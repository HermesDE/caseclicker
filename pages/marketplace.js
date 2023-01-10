import Navigation from "../components/Navigation/Navigation";
import MarketplaceOverview from "../components/Marketplace/MarketplaceOverview";
import Head from "next/head";
import UserContext from "../components/Context/UserContext";
import { useContext } from "react";

export default function Marketplace() {
  const { toggleMoneyUpdate, money } = useContext(UserContext);
  return (
    <>
      <Head>
        <title>Marketplace | Case Clicker Online</title>
        <meta name="description" content="sell your skins to other people" />
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
