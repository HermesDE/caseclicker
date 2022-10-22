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
} from "@mantine/core";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut, signIn } from "next-auth/react";
import RightIcon from "../icons/RightIcon";
import { openConfirmModal } from "@mantine/modals";

export default function Navigation({ children, money }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

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
      navbarOffsetBreakpoint="md"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="md"
          hidden={!opened}
          width={{ sm: 300, lg: 300 }}
        >
          <Navbar.Section grow>
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
          </Navbar.Section>
          <Navbar.Section>
            <Divider my={"sm"} label="User" labelPosition="center" />
            {session ? (
              <Menu position="right">
                <Menu.Target>
                  <UnstyledButton
                    sx={{
                      ":hover": {
                        backgroundColor:
                          theme.colorScheme === "dark"
                            ? theme.colors.dark[5]
                            : theme.colors.gray[0],
                      },
                      cursor: "pointer",
                      borderRadius: 5,

                      width: "100%",
                      padding: "10px",
                    }}
                  >
                    <Group position="center">
                      <Avatar src={session?.user?.image} />
                      <div>
                        <Text weight={500}>
                          {Math.round(money * 100) / 100} $
                        </Text>
                        <Text>{session?.user?.name}</Text>
                      </div>
                      <RightIcon size={18} />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item disabled>Profile</Menu.Item>
                  <Menu.Item color={"orange"} onClick={() => signOut()}>
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
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
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Title>Case Clicker</Title>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
