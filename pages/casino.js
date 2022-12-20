import Navigation from "../components/Navigation/Navigation";
import Head from "next/head";
import CasinoOverview from "../components/Casino/CasinoOverview";

export default function Casino({
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
        <title>Casino | Case Clicker Online</title>
        <meta name="description" content="gamble with your skins" />
      </Head>
      <Navigation money={money}>
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
