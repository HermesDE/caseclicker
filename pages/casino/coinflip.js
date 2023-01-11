import CoinflipOverview from "../../components/Casino/Coinflip/CoinflipOverview";
import Navigation from "../../components/Navigation/Navigation";
import Head from "next/head";
import UserContext from "../../components/Context/UserContext";
import { useContext } from "react";

export default function Coinflip() {
  const { toggleMoneyUpdate, money, tokens, setTokens } =
    useContext(UserContext);
  return (
    <>
      <Head>
        <title>Coinflip | Case Clicker Online</title>
      </Head>
      <Navigation>
        <CoinflipOverview
          tokens={tokens}
          toggleMoneyUpdate={toggleMoneyUpdate}
          setTokens={setTokens}
        />
      </Navigation>
    </>
  );
}
