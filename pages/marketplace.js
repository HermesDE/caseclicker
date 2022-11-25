import Navigation from "../components/Navigation/Navigation";
import MarketplaceOverview from "../components/Marketplace/MarketplaceOverview";
import Head from "next/head";

export default function Marketplace({
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
