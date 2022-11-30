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
  const sellOnClick = async () => {
    if (showcase) return;
    const body = {
      id: id,
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

  if (size === "small") {
    const { namePartOne, namePartTwo, shortExterior } = formatExterior(
      name,
      exterior
    );
    /* price = Intl.NumberFormat("en", {
      notation: "compact",
      style: "currency",
      currency: "USD",
    }).format(price); */
    return (
      <Card
        shadow={"sm"}
        p="xs"
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
            {price + " $"}
          </Badge>
          {float && (
            <Badge size={"sm"} color="dark">
              {Math.floor(float * 10000) / 10000}
            </Badge>
          )}
        </Group>
        <Group grow mt="xs" spacing="xs">
          <Tooltip label="Sell" withArrow color={"dark"}>
            <ActionIcon
              color={"red"}
              variant="light"
              disabled={sellLock}
              onClick={() => sellOnClick()}
            >
              <DollarIcon size={22} />
            </ActionIcon>
          </Tooltip>
          {rarity === "Classified" ||
          rarity === "Covert" ||
          rarity === "Extraordinary" ? (
            <Tooltip label="Offer" withArrow color={"dark"}>
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
      p="lg"
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
        <Badge color={"yellow"}>{price} $</Badge>
      </Group>

      <Group grow mt="md" spacing="xs">
        <Button
          variant="light"
          color={"red"}
          radius="md"
          disabled={sellLock}
          onClick={() => sellOnClick()}
        >
          Sell for {price} $
        </Button>
        {rarity === "Classified" ||
        rarity === "Covert" ||
        rarity === "Extraordinary" ? (
          <Button variant="default" onClick={() => offerOnClick()}>
            Offer on marketplace
          </Button>
        ) : (
          ""
        )}
      </Group>
    </Card>
  );
}
