import CaseShowcase from "../components/Cases/CaseShowcase";
import Navigation from "../components/Navigation/Navigation";
import Head from "next/head";

export default function Cases({
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
        <title>Cases | Case Clicker Online</title>
        <meta name="description" content="open some juicy cases" />
      </Head>
      <Navigation money={money}>
        <CaseShowcase
          money={money}
          toggleMoneyUpdate={toggleMoneyUpdate}
          userOpenedCases={userOpenedCases}
        />
      </Navigation>
    </>
  );
}
