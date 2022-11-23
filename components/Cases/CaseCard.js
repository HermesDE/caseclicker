import {
  Badge,
  Button,
  Card,
  Center,
  Group,
  Image,
  Text,
  Tooltip,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import { motion } from "framer-motion";
import UnboxedSkinCard from "./UnboxedSkinCard";
import { useMemo, useState } from "react";
import { showNotification } from "@mantine/notifications";
import CustomCaseContent from "./CustomCaseContent";
import InfoIcon from "../icons/InfoIcon";
import LightningIcon from "../icons/LightningIcon";
import CaseOpeningCarousel from "./CaseOpeningCarousel";
import CustomCaseOpeningCarousel from "./CustomCaseOpeningCarousel";

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
  caseOpenAnimationSound,
  customCase,
  moneySpend,
  moneyEarned,
  openedCount,
}) {
  const [loading, setLoading] = useState(false);
  const revenue = useMemo(() => {
    return Math.floor((moneyEarned / openedCount) * 100) / 100;
  }, [moneyEarned, openedCount]);
  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  const buyCase = async (quickOpen) => {
    setLoading(true);
    const body = {
      id: id,
      quickOpen: quickOpen,
    };
    const response = await fetch(
      `/api/buy/${customCase ? "customCase" : "case"}`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      }
    );
    setLoading(false);
    if (!response.ok) {
      showNotification({
        title: "Error",
        message: "Error while opening the case",
        color: "red",
      });
      return;
    }
    return await response.json();
  };

  return (
    <Card shadow={"sm"} p="lg" radius={"md"} withBorder>
      <Tooltip
        datatype=""
        multiline
        position="left"
        events={{ hover: true, touch: true }}
        label={
          <>
            <Text>{`Revenue: ${revenue}$/case`}</Text>
            <Text>{`Opened ${formatter.format(openedCount)} times`}</Text>
          </>
        }
      >
        <div style={{ position: "absolute", left: "90%", cursor: "pointer" }}>
          <InfoIcon size={24} />
        </div>
      </Tooltip>

      <Card.Section>
        <Center>
          <motion.image whileHover={{ scaleY: 1.01 }}>
            {customCase ? (
              <Image
                onClick={() =>
                  openModal({
                    title: "Content",
                    children: <CustomCaseContent id={id} />,
                    size: "xl",
                  })
                }
                alt={name}
                src={`/pictures/cases/${iconUrl}`}
                height={150}
                width={225}
                fit="contain"
                sx={{ cursor: "pointer" }}
              ></Image>
            ) : (
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
            )}
          </motion.image>
        </Center>
      </Card.Section>

      <Group position="apart" mt={"md"} mb="xs">
        <Text weight={500}>{name}</Text>
        <Badge color={"yellow"}>{price} $</Badge>
      </Group>
      <Group spacing={"xs"} mt={"md"} position="apart">
        <Button
          sx={{ width: "65%" }}
          variant="light"
          disabled={
            loading || money < price || userOpenedCases < neededOpenedCases
          }
          loading={loading}
          radius="md"
          onClick={async () => {
            const skins = await buyCase(false);
            if (!skins) return;

            caseOpenAnimationSound();
            customCase
              ? openModal({
                  title: `Opening ${name}`,
                  children: (
                    <CustomCaseOpeningCarousel
                      toggleMoneyUpdate={toggleMoneyUpdate}
                      skins={skins.skins}
                      skingroups={skins.skingroups}
                      unboxedSkin={skins.newOpenedSkin}
                    />
                  ),
                  size: "xl",
                })
              : openModal({
                  title: `Opening ${name}`,
                  children: (
                    <CaseOpeningCarousel
                      toggleMoneyUpdate={toggleMoneyUpdate}
                      skins={skins.skins}
                      unboxedSkin={skins.newOpenedSkin}
                    />
                  ),
                  size: "xl",
                });
          }}
        >
          Buy and open
        </Button>
        <Button
          sx={{ width: "30%" }}
          leftIcon={<LightningIcon size={20} />}
          disabled={
            loading || money < price || userOpenedCases < neededOpenedCases
          }
          loading={loading}
          variant="outline"
          color={"yellow"}
          radius="md"
          onClick={async () => {
            caseOpenSound();

            const unboxedSkin = await buyCase(true);
            if (!unboxedSkin) return;

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
            : "Open"}
        </Button>
      </Group>
    </Card>
  );
}
