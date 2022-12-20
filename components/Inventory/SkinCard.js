import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Center,
  Group,
  Image,
  Text,
  Tooltip,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { openModal } from "@mantine/modals";
import MarketplaceOfferModal from "./MarketplaceOfferModal";
import SkingroupContentCard from "./SkingroupContentCard";
import formatExterior from "../../lib/formatExterior";
import DollarIcon from "../icons/DollarIcon";
import BagIcon from "../icons/BagIcon";
import TokensIcon from "../icons/TokensIcon";

export default function SkinCard({
  id,
  classId,
  name,
  iconUrl,
  price,
  exterior,
  rarity,
  rarityColor,
  float,
  statTrak,
  knifeType,
  souvenir,
  type,
  deleteSkin,
  toggleMoneyUpdate,
  sellLock,
  size,
  showcase,
}) {
  const imageOnClick = () => {
    if (showcase) return;
    openModal({
      children: <SkingroupContentCard classId={classId} />,
      size: "xl",
    });
  };
  const convertToTokens = async () => {
    if (showcase) return;
    const body = {
      id,
    };
    const response = await fetch("/api/casino/skinToTokens", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      deleteSkin(id);
      toggleMoneyUpdate();
    } else {
      showNotification({
        title: "Oops",
        message: "Something went wrong while converting your skin to tokens",
        color: "red",
      });
    }
  };
  const sellOnClick = async () => {
    if (showcase) return;
    const body = {
      id,
    };
    const response = await fetch("/api/inventory", {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      deleteSkin(id);
      toggleMoneyUpdate();
      /* showNotification({
        title: "Item sold!",
        message: `You sold your ${name} for ${price} $.`,
        color: "green",
      }); */
    } else {
      showNotification({
        title: "Oops",
        message: "Something went wrong while selling your skin",
        color: "red",
      });
    }
  };
  const offerOnClick = () => {
    if (showcase) return;
    openModal({
      title: "Offer this skin on the marketplace",
      children: (
        <MarketplaceOfferModal
          id={id}
          name={name}
          iconUrl={iconUrl}
          price={price}
          rarity={rarity}
          rarityColor={rarityColor}
          float={float}
          deleteSkin={deleteSkin}
        />
      ),
      size: "lg",
    });
  };

  const formattedPrice = Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(price);

  if (size === "small") {
    const { namePartOne, namePartTwo, shortExterior } = formatExterior(
      name,
      exterior
    );

    return (
      <Card
        shadow={"sm"}
        //p="xs"
        radius={"md"}
        withBorder
        sx={{
          minWidth: 150,
          borderColor:
            knifeType !== null
              ? "purple"
              : statTrak
              ? "orange"
              : souvenir
              ? "yellow"
              : type === "Gloves"
              ? "purple"
              : "dark.04",
        }}
      >
        <Group position="apart">
          <Badge variant="filled" color={"dark"}>
            {shortExterior}
          </Badge>
          {statTrak && (
            <Badge variant="filled" color={"orange"}>
              ST
            </Badge>
          )}
          {souvenir && (
            <Badge variant="filled" color={"yellow"}>
              S
            </Badge>
          )}
        </Group>
        <Center>
          <Text weight={500} size="xs" color={"#" + rarityColor}>
            {namePartOne}
          </Text>
        </Center>
        <Center>
          <Text weight={500} size="xs" color={"#" + rarityColor}>
            {namePartTwo}
          </Text>
        </Center>
        <Image
          sx={{ cursor: "pointer" }}
          onClick={() => imageOnClick()}
          alt={name}
          src={`https://steamcommunity-a.akamaihd.net/economy/image/${iconUrl}`}
          height={75}
          fit="contain"
        />

        <Group mt={5} spacing="xs" position="apart">
          <Badge size={"sm"} color="yellow">
            {formattedPrice}
          </Badge>
          {float && (
            <Badge size={"sm"} color="dark">
              {Math.floor(float * 10000) / 10000}
            </Badge>
          )}
        </Group>
        <Group grow mt="xs" spacing="xs">
          <Tooltip label="Sell" withArrow color={"dark"} openDelay={500}>
            <ActionIcon
              color={"red"}
              variant="light"
              disabled={sellLock}
              onClick={() => sellOnClick()}
            >
              <DollarIcon size={22} />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            label="Convert to tokens"
            withArrow
            multiline
            color={"dark"}
            openDelay={500}
          >
            <ActionIcon
              color={"yellow"}
              variant="outline"
              onClick={() => convertToTokens()}
            >
              <TokensIcon />
            </ActionIcon>
          </Tooltip>
          {rarity === "Classified" ||
          rarity === "Covert" ||
          rarity === "Extraordinary" ? (
            <Tooltip label="Offer" withArrow color={"dark"} openDelay={500}>
              <ActionIcon variant="default" onClick={() => offerOnClick()}>
                <BagIcon size={20} />
              </ActionIcon>
            </Tooltip>
          ) : null}
        </Group>
      </Card>
    );
  }

  return (
    <Card
      shadow={"sm"}
      //p="lg"
      radius={"md"}
      withBorder
      sx={{
        borderColor:
          knifeType !== null
            ? "purple"
            : statTrak
            ? "orange"
            : souvenir
            ? "yellow"
            : type === "Gloves"
            ? "purple"
            : "dark.04",
      }}
    >
      <Card.Section>
        <Image
          sx={{ cursor: "pointer" }}
          onClick={() => imageOnClick()}
          alt={name}
          src={`https://steamcommunity-a.akamaihd.net/economy/image/${iconUrl}`}
          height={100}
          fit="contain"
        ></Image>
      </Card.Section>
      <Text weight={500} color={"#" + rarityColor}>
        {name.split("|").shift()}
      </Text>
      <Text weight={500} color={"#" + rarityColor}>
        {name.split("|").pop()}
      </Text>
      <Group position="apart" mt={"md"}>
        <Text color={"dark.2"} size="xs">
          {float}
        </Text>
        <Badge color={"yellow"}>{formattedPrice}</Badge>
      </Group>

      <Group grow mt="md" spacing="xs">
        <Tooltip
          color={"dark"}
          withArrow
          multiline
          label={`Sell for ${formattedPrice}`}
          openDelay={500}
        >
          <Button
            variant="light"
            color={"red"}
            radius="md"
            disabled={sellLock}
            onClick={() => sellOnClick()}
          >
            Sell for {formattedPrice}
          </Button>
        </Tooltip>

        <Tooltip
          color={"dark"}
          withArrow
          multiline
          label="Convert to tokens"
          openDelay={500}
        >
          <Button
            leftIcon={<TokensIcon />}
            color="yellow"
            variant="outline"
            onClick={() => convertToTokens()}
          >
            Convert to tokens
          </Button>
        </Tooltip>

        {rarity === "Classified" ||
        rarity === "Covert" ||
        rarity === "Extraordinary" ? (
          <Tooltip
            color={"dark"}
            withArrow
            multiline
            label="Offer on marketplace"
            openDelay={500}
          >
            <Button variant="default" onClick={() => offerOnClick()}>
              Offer on marketplace
            </Button>
          </Tooltip>
        ) : (
          ""
        )}
      </Group>
    </Card>
  );
}
