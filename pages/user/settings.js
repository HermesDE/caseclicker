import Head from "next/head";
import Navigation from "../../components/Navigation/Navigation";
import SettingsOverview from "../../components/Settings/SettingsOverview";
import { useSession } from "next-auth/react";

export default function Settings({
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
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <>
        <Head>
          <title>Settings | Case Clicker Online</title>
          <meta name="description" content="configure your settings" />
        </Head>
        <Navigation money={money}>
          <SettingsOverview session={session} />
        </Navigation>
      </>
    );
  }
}
