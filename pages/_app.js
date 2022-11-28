import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";
import {
  NotificationsProvider,
  showNotification,
} from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { useState, useEffect } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [money, setMoney] = useState(0);
  const [moneyPerClick, setMoneyPerClick] = useState(0);
  const [update, setUpdate] = useState(false);
  const [tokens, setTokens] = useState(0);
  const [userOpenedCases, setUserOpenedCases] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/me");

      if (!response.ok && response.status !== 401) {
        return showNotification({
          title: "Error",
          message: `Error while fetching user information\nError Message: ${response.status} ${response.statusText}`,
          color: "red",
        });
      }
      const data = await response.json();
      setMoney(data.money);
      setMoneyPerClick(data.moneyPerClick);
      setTokens(data.tokens);
      setUserOpenedCases(data.openedCases);
    }
    fetchData();
  }, [update]);

  const toggleMoneyUpdate = () => {
    setUpdate(!update);
  };
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <SessionProvider
        session={session}
        refetchInterval={120}
        refetchOnWindowFocus
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme: "dark", breakpoints: [{ xl: 1500 }] }}
        >
          <NotificationsProvider>
            <ModalsProvider>
              <Component
                toggleMoneyUpdate={toggleMoneyUpdate}
                money={money}
                setMoney={setMoney}
                moneyPerClick={moneyPerClick}
                setMoneyPerClick={setMoneyPerClick}
                tokens={tokens}
                setTokens={setTokens}
                userOpenedCases={userOpenedCases}
                setUserOpenedCases={setUserOpenedCases}
                {...pageProps}
              />
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
