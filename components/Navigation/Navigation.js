import { useEffect, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Title,
  NavLink,
  Group,
  Avatar,
  UnstyledButton,
  Divider,
  Menu,
  Button,
  Center,
  Indicator,
  ActionIcon,
  ScrollArea,
  Grid,
  Alert,
} from "@mantine/core";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut, signIn } from "next-auth/react";
import RightIcon from "../icons/RightIcon";
import { openConfirmModal } from "@mantine/modals";
import NotificationDrawer from "../Notifications/NotificationDrawer";
import ArrowUpIcon from "../icons/ArrowUpIcon";
import LogoutIcon from "../icons/LogoutIcon";

export default function Navigation({ children, money }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

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
      navbarOffsetBreakpoint="lg"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="lg"
          hidden={!opened}
          width={{ sm: 275 }}
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

                  <div>
                    <Text weight={500}>{Math.round(money * 100) / 100} $</Text>
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
                        onClick={() => signOut()}
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
        <Header height={70} p="md">
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
              <Title sx={{ cursor: "pointer" }}>CC Online</Title>
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
          </div>
        </Header>
      }
    >
      <>
        {status === "unauthenticated" && (
          <Alert color={"orange"} title="You are currently not logged in">
            <Text weight={500}>
              Hey you! It looks like you are not currently logged in. This means
              that you can browse through all pages, but you cant interact with
              the site. To play Case Clicker Online you need to log in. This
              will also save your progress and allow you to play from anywhere
              on many different devices.
            </Text>
          </Alert>
        )}

        {children}
      </>
    </AppShell>
  );
}
