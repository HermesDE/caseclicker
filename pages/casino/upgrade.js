import UpgradeOverview from "../../components/Casino/Upgrade/UpgradeOverview";
import Navigation from "../../components/Navigation/Navigation";
import Head from "next/head";

export default function Upgrade({
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
        <title>Casino Upgrade | Case Clicker Online</title>
      </Head>
      <Navigation money={money}>
        <UpgradeOverview />
      </Navigation>
    </>
  );
}
