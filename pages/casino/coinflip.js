import CoinflipOverview from "../../components/Casino/Coinflip/CoinflipOverview";
import Navigation from "../../components/Navigation/Navigation";
import Head from "next/head";

export default function Coinflip({
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
        <title>Coinflip | Case Clicker Online</title>
      </Head>
      <Navigation money={money}>
        <CoinflipOverview
          tokens={tokens}
          toggleMoneyUpdate={toggleMoneyUpdate}
          setTokens={setTokens}
        />
      </Navigation>
    </>
  );
}
