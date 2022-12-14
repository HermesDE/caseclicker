import PrivacyPolicy from "../components/Info/PrivacyPolicy";
import Head from "next/head";
import Navigation from "../components/Navigation/Navigation";

export default function Page({ money }) {
  return (
    <>
      <Head>
        <title>Privacy Policy | Case Clicker Online</title>
      </Head>
      <Navigation money={money}>
        <PrivacyPolicy />
      </Navigation>
    </>
  );
}
