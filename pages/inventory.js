import InventoryShowcase from "../components/Inventory/InventoryShowcase";
import Navigation from "../components/Navigation/Navigation";
import Head from "next/head";

export default function Inventory({
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
        <title>Inventory | Case Clicker Online</title>
        <meta name="description" content="look at your beautiful skins" />
      </Head>
      <Navigation money={money}>
        <InventoryShowcase toggleMoneyUpdate={toggleMoneyUpdate} />
      </Navigation>
    </>
  );
}
