import { Button, Card, Group, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [cookieBanner, setCookieBanner] = useLocalStorage({
    key: "cookieBanner",
    defaultValue: true,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cookieBanner) {
      setLoading(false);
    }
  }, [cookieBanner]);

  if (!cookieBanner || loading) {
    return null;
  }

  return (
    <Card
      withBorder
      sx={{
        position: "fixed",
        zIndex: 1000,
        bottom: 0,
        borderColor: "red",
      }}
    >
      <Group position="apart">
        <Text>
          This site uses cookies only for user session storage. For more
          information visit the
          <Link href={"/privacy-policy"}>
            <Text color={"blue"} sx={{ cursor: "pointer" }}>
              privacy policy
            </Text>
          </Link>
        </Text>
        <Button onClick={() => setCookieBanner(false)}>Close</Button>
      </Group>
    </Card>
  );
}
