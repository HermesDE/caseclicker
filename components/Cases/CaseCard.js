import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Center,
  Group,
  Image,
  Select,
  Text,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import { motion } from "framer-motion";
import UnboxedSkinCard from "./UnboxedSkinCard";
import { useMemo, useState } from "react";
import { showNotification } from "@mantine/notifications";
import CustomCaseContent from "./CustomCaseContent";
import LightningIcon from "../icons/LightningIcon";
import CaseOpeningCarousel from "./CaseOpeningCarousel";
import CustomCaseOpeningCarousel from "./CustomCaseOpeningCarousel";
import { useMediaQuery } from "@mantine/hooks";
import findRankById from "../../lib/findRankById";
import UnboxedSkinsCarousel from "./UnboxedSkinsCarousel";
import sortSkinsByRarity from "../../lib/sortSkinsByRarity";

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
  rankNeeded,
  userOpenedCases,
  caseOpenSound,
  caseOpenAnimationSound,
  customCase,
  moneySpend,
  moneyEarned,
  openedCount,
  size,
  showcase,
  rank,
  count,
}) {
  const [loading, setLoading] = useState(false);
  const mobile = useMediaQuery("(max-width: 900px)");
  const { short } = findRankById(rankNeeded);
  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: "USD",
    }).format(price * count);
  }, [count, price]);

  const buyCase = async (quickOpen) => {
    setLoading(true);
    const body = {
      id,
      quickOpen,
      count,
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

  const onClickImage = () => {
    if (showcase) return;
    openModal({
      title: "Content",
      children: <CustomCaseContent id={id} />,
      size: "xl",
    });
  };
  const onClickBuyButton = async () => {
    if (showcase) return;
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
              unboxedSkins={skins.openedSkins}
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
              unboxedSkins={skins.openedSkins}
            />
          ),
          size: "xl",
        });
  };
  const onClickQuickBuyButton = async () => {
    if (showcase) return;
    caseOpenSound();

    const skins = await buyCase(true);
    const sortedSkins = await sortSkinsByRarity(skins);
    if (!skins) return;

    toggleMoneyUpdate();
    openModal({
      title: "Look what you unboxed",
      children: <UnboxedSkinsCarousel skins={sortedSkins} />,
      size: skins.length === 1 ? "xl" : "100%",
      transition: "slide-up",
      transitionDuration: 300,
    });
  };

  if (size === "small") {
    return (
      <Card
        sx={{ minWidth: 275 }}
        shadow={"sm"}
        p="md"
        radius={"md"}
        withBorder
      >
        <Group position="apart">
          <div style={{ width: "75%" }}>
            <Text truncate weight={500} size={"xs"}>
              {name}
            </Text>
          </div>

          <Badge size="sm" color={"yellow"}>
            {formattedPrice}
          </Badge>
        </Group>

        <Group position="apart" spacing={"xs"}>
          <motion.div whileHover={{ scale: 1.15 }}>
            {customCase ? (
              <Image
                onClick={() => onClickImage()}
                alt={name}
                src={`/pictures/cases/${iconUrl}`}
                height={75}
                width={112}
                fit="contain"
                sx={{ cursor: "pointer" }}
              ></Image>
            ) : (
              <a href={link} rel="noreferrer" target={"_blank"}>
                <Image
                  alt={name}
                  mt={10}
                  src={`/pictures/cases/${iconUrl}`}
                  height={50}
                  width={75}
                  fit="contain"
                  sx={{ cursor: "pointer" }}
                ></Image>
              </a>
            )}
          </motion.div>
          <Button
            variant="light"
            disabled={loading || money < price * count || rank.id < rankNeeded}
            loading={loading}
            radius="md"
            onClick={async () => onClickBuyButton()}
          >
            {loading
              ? "Opening"
              : money < price * count
              ? "Not enough money"
              : rank.id < rankNeeded
              ? `Reach ${short}`
              : "Buy & Open"}
          </Button>
          <ActionIcon
            disabled={loading || money < price * count || rank.id < rankNeeded}
            loading={loading}
            variant="outline"
            color={"yellow"}
            radius="md"
            onClick={async () => onClickQuickBuyButton()}
            size={36}
          >
            <LightningIcon size={22} />
          </ActionIcon>
        </Group>
      </Card>
    );
  }

  return (
    <Card shadow={"sm"} p="lg" radius={"md"} withBorder>
      {/* <Tooltip
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
      </Tooltip> */}

      <Card.Section>
        <Center>
          <motion.div whileHover={{ scale: 1.15 }}>
            {customCase ? (
              <Image
                onClick={() => onClickImage()}
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
          </motion.div>
        </Center>
      </Card.Section>

      <Group position="apart" mt={"md"} mb="xs">
        <div style={{ width: "75%" }}>
          <Text truncate weight={500}>
            {name}
          </Text>
        </div>
        <Badge color={"yellow"}>{formattedPrice}</Badge>
      </Group>
      <Group spacing={"xs"} mt={"md"} position="apart">
        <Button
          sx={{ width: "65%" }}
          variant="light"
          disabled={loading || money < price * count || rank.id < rankNeeded}
          loading={loading}
          radius="md"
          onClick={async () => onClickBuyButton()}
        >
          {loading
            ? "Opening"
            : money < price * count
            ? "Not enough money"
            : rank.id < rankNeeded
            ? `Reach rank ${short} to unlock`
            : "Buy and Open"}
        </Button>
        <Button
          sx={{ width: "30%" }}
          leftIcon={<LightningIcon size={20} />}
          disabled={loading || money < price * count || rank.id < rankNeeded}
          loading={loading}
          variant="outline"
          color={"yellow"}
          radius="md"
          onClick={async () => onClickQuickBuyButton()}
        >
          Open
        </Button>
      </Group>
    </Card>
  );
}
