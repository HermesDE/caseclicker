import { useEffect, useState } from "react";
import {
  AppShell,
  Aside,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Title,
  NavLink,
  Group,
  Avatar,
  Divider,
  Menu,
  Button,
  Center,
  Indicator,
  ActionIcon,
  ScrollArea,
  Alert,
} from "@mantine/core";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut, signIn } from "next-auth/react";
import NotificationDrawer from "../Notifications/NotificationDrawer";
import ArrowUpIcon from "../icons/ArrowUpIcon";
import LogoutIcon from "../icons/LogoutIcon";
import SettingsIcon from "../icons/SettingsIcon";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import CookieBanner from "../dsgvo/CookieBanner";
import PromoCodeIcon from "../icons/PromoCodeIcon";
import { openModal } from "@mantine/modals";
import RedeemCodeModal from "./RedeemCodeModal";
import CoinflipChat from "../Casino/Coinflip/CoinflipChat";
import CoinflipChatInput from "../Casino/Coinflip/CoinflipChatInput";

export default function Navigation({ children, money }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const mobile = useMediaQuery("(max-width: 900px)");
  const [asideOpened, setAsideOpened] = useState(!mobile);

  //chat states and functions
  const coinflipHandleSubmit = (socket, message) => {
    socket.emit("newMessage", message);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/notifications");
      setNotifications(await response.json());
    }
    fetchData();
  }, []);

  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification._id !== id)
    );
  };

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      //asideOffsetBreakpoint={"xl"}
      /* aside={
        router.pathname.includes("/coinflip") ? (
          <Aside
            p="md"
            hiddenBreakpoint={"xl"}
            hidden={!asideOpened}
            width={{ sm: 350 }}
          >
            <Aside.Section component={ScrollArea} grow>
              <CoinflipChat handleSubmit={coinflipHandleSubmit} />
            </Aside.Section>
            <Aside.Section>
              <CoinflipChatInput handleSubmit={coinflipHandleSubmit} />
            </Aside.Section>
          </Aside>
        ) : null
      } */
      navbarOffsetBreakpoint="lg"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="lg"
          hidden={!opened}
          width={{ sm: mobile ? 400 : 275 }}
        >
          <Navbar.Section component={ScrollArea} grow>
            <Link href="/" passHref>
              <NavLink
                component="a"
                label="Home"
                description="click you rich"
                active={router.pathname === "/"}
                color="orange"
                sx={{ padding: 30, borderRadius: 5, marginTop: 10 }}
                styles={{ label: { fontSize: "20px" } }}
              />
            </Link>
            <Link href="/cases" passHref>
              <NavLink
                component="a"
                label="Cases"
                description="open some juicy cases"
                active={router.pathname === "/cases"}
                color="orange"
                sx={{ padding: 30, borderRadius: 5, marginTop: 10 }}
                styles={{ label: { fontSize: "20px" } }}
              />
            </Link>
            <Link href="/inventory" passHref>
              <NavLink
                component="a"
                label="Inventory"
                description="look at your beautiful skins"
                active={router.pathname === "/inventory"}
                color="orange"
                sx={{ padding: 30, borderRadius: 5, marginTop: 10 }}
                styles={{ label: { fontSize: "20px" } }}
              />
            </Link>
            <Link href="/marketplace" passHref>
              <NavLink
                component="a"
                label="Marketplace"
                description="sell your skins to other people"
                active={router.pathname === "/marketplace"}
                color="orange"
                sx={{ padding: 30, borderRadius: 5, marginTop: 10 }}
                styles={{ label: { fontSize: "20px" } }}
              />
            </Link>
            <Link href="/casino" passHref>
              <NavLink
                component="a"
                label="Casino"
                description="gamble with your skins"
                active={router.pathname.includes("/casino")}
                color="orange"
                sx={{ padding: 30, borderRadius: 5, marginTop: 10 }}
                styles={{ label: { fontSize: "20px" } }}
              />
            </Link>
          </Navbar.Section>
          <Navbar.Section>
            <Divider my={"sm"} labelPosition="center" />
            {session ? (
              <>
                <Group position="center">
                  {notifications.length > 0 ? (
                    <Indicator
                      color={"orange"}
                      onClick={() => setOpen(true)}
                      sx={{ cursor: "pointer" }}
                      showZero={false}
                      label={notifications.length}
                      overflowCount={10}
                      size={22}
                    >
                      <Avatar
                        onClick={() => setOpen(true)}
                        sx={{ cursor: "pointer" }}
                        src={session?.user?.image}
                      />
                    </Indicator>
                  ) : (
                    <Avatar
                      onClick={() => setOpen(true)}
                      sx={{ cursor: "pointer" }}
                      src={session?.user?.image}
                    />
                  )}

                  <div>
                    <Text weight={500}>
                      {new Intl.NumberFormat("en", {
                        style: "currency",
                        currency: "USD",
                      }).format(money)}
                    </Text>
                    <Text>{session?.user?.name}</Text>
                  </div>
                  <Menu position="top">
                    <Menu.Target>
                      <ActionIcon>
                        <ArrowUpIcon size={26} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        onClick={() => router.push("/user/settings")}
                        icon={<SettingsIcon size={16} />}
                      >
                        Settings
                      </Menu.Item>
                      <Menu.Item
                        onClick={() =>
                          openModal({
                            title: "Redeem Code",
                            children: <RedeemCodeModal />,
                          })
                        }
                        icon={<PromoCodeIcon size={16} />}
                      >
                        Redeem Code
                      </Menu.Item>
                      <Menu.Item
                        onClick={() =>
                          signOut({
                            callbackUrl: window.location.origin + "/auth/login",
                          })
                        }
                        color={"red"}
                        icon={<LogoutIcon size={16} />}
                      >
                        Logout
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>

                <NotificationDrawer
                  deleteNotification={deleteNotification}
                  notifications={notifications}
                  open={open}
                  setOpen={setOpen}
                />
              </>
            ) : (
              <Center>
                <Button
                  fullWidth
                  variant="outline"
                  color={"orange"}
                  onClick={() => signIn()}
                >
                  Login
                </Button>
              </Center>
            )}
          </Navbar.Section>
        </Navbar>
      }
      /* footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      } */
      header={
        <Header height={mobile ? 30 : 70} p="md">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <MediaQuery largerThan="lg" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Link href={"/"}>
              <Image
                alt="case clicker online logo"
                style={{ cursor: "pointer" }}
                src={"/pictures/logos/full/logo-no-background.png"}
                width={mobile ? 250 : 500}
                height={mobile ? 25 : 50}
                objectFit={"contain"}
              />
            </Link>

            <div>
              {/* <div style={{ marginLeft: 10 }}>
                <Link href={"/legal-notice"}>
                  <Text
                    sx={{ cursor: "pointer" }}
                    size={"sm"}
                    weight={200}
                    component="a"
                  >
                    Impressum / Legal Notice
                  </Text>
                </Link>
              </div> */}

              <div style={{ marginLeft: 10 }}>
                <Link style={{ marginLeft: 200 }} href={"/privacy-policy"}>
                  <Text
                    sx={{ cursor: "pointer" }}
                    size={"sm"}
                    weight={200}
                    component="a"
                  >
                    Privacy Policy
                  </Text>
                </Link>
              </div>
            </div>
            {router.pathname.includes("/coinflip") ? (
              <MediaQuery largerThan="xl" styles={{ display: "none" }}>
                <Burger
                  opened={asideOpened}
                  onClick={() => setAsideOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                />
              </MediaQuery>
            ) : null}
          </div>
        </Header>
      }
    >
      <>
        <CookieBanner />
        {children}
        {status === "unauthenticated" && (
          <Alert
            mt={20}
            color={"orange"}
            title="You are currently not logged in"
          >
            <Text weight={500}>
              Hey you! It looks like you are not currently logged in. This means
              that you can browse through all pages, but you cant interact with
              the site. To play Case Clicker Online you need to log in. This
              will also save your progress and allow you to play from anywhere
              on many different devices.
            </Text>
          </Alert>
        )}
      </>
    </AppShell>
  );
}
