import CaseShowcase from "../components/Cases/CaseShowcase";
import Navigation from "../components/Navigation/Navigation";
import Head from "next/head";
import UserContext from "../components/Context/UserContext";
import { useContext } from "react";

export default function Cases() {
  const { toggleMoneyUpdate, money, userOpenedCases } = useContext(UserContext);
  return (
    <>
      <Head>
        <title>Cases | Case Clicker Online</title>
        <meta name="description" content="open some juicy cases" />
      </Head>
      <Navigation>
        <CaseShowcase
          money={money}
          toggleMoneyUpdate={toggleMoneyUpdate}
          userOpenedCases={userOpenedCases}
        />
      </Navigation>
    </>
  );
}
