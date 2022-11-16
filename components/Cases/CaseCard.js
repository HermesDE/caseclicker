import { Badge, Button, Card, Center, Group, Image, Text } from "@mantine/core";
import { openModal, closeAllModals } from "@mantine/modals";
import { motion } from "framer-motion";
import UnboxedSkinCard from "./UnboxedSkinCard";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";

export default function CaseCard({
  id,
  name,
  iconUrl,
  price,
  rarity,
  rarityColor,
  toggleMoneyUpdate,
  money,
  link,
  neededOpenedCases,
  userOpenedCases,
  caseOpenSound,
}) {
  const [loading, setLoading] = useState(false);

  return (
    <Card shadow={"sm"} p="lg" radius={"md"} withBorder>
      <Card.Section>
        <Center>
          <motion.image whileHover={{ scaleY: 1.1 }}>
            <a href={link} rel="noreferrer" target={"_blank"}>
              <Image
                alt={name}
                mt={10}
                src={`/pictures/cases/${iconUrl}`}
                height={100}
                width={150}
                fit="contain"
                sx={{ cursor: "pointer" }}
              ></Image>
            </a>
          </motion.image>
        </Center>
      </Card.Section>

      <Group position="apart" mt={"md"} mb="xs">
        <Text weight={500}>{name}</Text>
        <Badge color={"yellow"}>{price} $</Badge>
      </Group>
      <Button
        disabled={
          loading || money < price || userOpenedCases < neededOpenedCases
        }
        loading={loading}
        variant="light"
        color={"blue"}
        fullWidth
        mt={"md"}
        radius="md"
        onClick={async () => {
          setLoading(true);
          caseOpenSound();
          const body = {
            id: id,
          };
          const response = await fetch("/api/buy/case", {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
          });
          setLoading(false);
          if (!response.ok) {
            showNotification({
              title: "Error",
              message: "Error while opening the case",
              color: "red",
            });
            return;
          }
          const unboxedSkin = await response.json();

          toggleMoneyUpdate();
          openModal({
            title: "Look what you unboxed",
            children: <UnboxedSkinCard skin={unboxedSkin} />,
            size: "lg",
            transition: "slide-up",
            transitionDuration: 300,
          });
        }}
      >
        {loading
          ? "Opening"
          : money < price
          ? "Not enough money"
          : userOpenedCases < neededOpenedCases
          ? `Open another ${
              neededOpenedCases - userOpenedCases
            } cases to unlock`
          : "Buy and open"}
      </Button>
    </Card>
  );
}
