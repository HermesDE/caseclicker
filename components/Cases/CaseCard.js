import { Badge, Button, Card, Center, Group, Image, Text } from "@mantine/core";
import { openModal, closeAllModals } from "@mantine/modals";
import CaseDrops from "./CaseDrops";
import { motion } from "framer-motion";
import useSound from "use-sound";
import UnboxedSkinCard from "./UnboxedSkinCard";
import { useEffect, useRef, useState } from "react";

export default function CaseCard({
  id,
  name,
  iconUrl,
  price,
  rarity,
  rarityColor,
  toggleMoneyUpdate,
}) {
  const [play] = useSound("/sounds/caseDrop.mp3", { volume: 0.1 });
  const [caseOpen] = useSound("/sounds/caseOpen.mp3", { volume: 0.1 });

  return (
    <Card shadow={"sm"} p="lg" radius={"md"} withBorder>
      <Card.Section>
        <Center>
          <motion.image whileHover={{ scaleY: 1.1 }}>
            <Image
              mt={10}
              onClick={() => {
                play();
                openModal({
                  title: name,
                  children: <CaseDrops close={closeAllModals} id={id} />,
                  transition: "slide-down",
                  transitionDuration: 500,
                });
              }}
              src={`/pictures/cases/${iconUrl}`}
              height={100}
              width={150}
              fit="contain"
              sx={{ cursor: "pointer" }}
            ></Image>
          </motion.image>
        </Center>
      </Card.Section>

      <Group position="apart" mt={"md"} mb="xs">
        <Text weight={500}>{name}</Text>
        <Badge color={"yellow"}>{price} $</Badge>
      </Group>
      <Button
        variant="light"
        color={"blue"}
        fullWidth
        mt={"md"}
        radius="md"
        onClick={async () => {
          caseOpen();
          const body = {
            id: id,
          };
          const response = await fetch("/api/buy/case", {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
          });
          if (!response.ok) return;
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
        Buy and open
      </Button>
    </Card>
  );
}
