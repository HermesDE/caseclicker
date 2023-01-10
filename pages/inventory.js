import InventoryShowcase from "../components/Inventory/InventoryShowcase";
import Navigation from "../components/Navigation/Navigation";
import Head from "next/head";
import UserContext from "../components/Context/UserContext";
import { useContext } from "react";

export default function Inventory() {
  const { toggleMoneyUpdate, money } = useContext(UserContext);
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
