import Navigation from "../components/Navigation/Navigation";
import Clicker from "../components/Frontpage/Clicker";
import Informations from "../components/Frontpage/Informations";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Case Clicker Online</title>
        <meta
          name="description"
          content="case clicker online is a CSGO like case opening simulation"
        />
        <meta
          name="keywords"
          content="csgo, cs:go, case clicker, case clicker online, case simulator, csgo clicker"
        />
      </Head>
      <Navigation>
        <Clicker />
        <Informations />
      </Navigation>
    </>
  );
}
