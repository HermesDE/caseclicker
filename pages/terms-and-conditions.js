import Head from "next/head";
import TermsAndConditions from "../components/Info/TermsAndConditions";
import Navigation from "../components/Navigation/Navigation";

export default function Page({ money }) {
  return (
    <>
      <Head>
        <title>Terms and Conditions | Case Clicker Online</title>
      </Head>
      <Navigation money={money}>
        <TermsAndConditions />
      </Navigation>
    </>
  );
}
