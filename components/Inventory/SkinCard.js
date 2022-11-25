import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { openModal } from "@mantine/modals";
import MarketplaceOfferModal from "./MarketplaceOfferModal";
import SkingroupContentCard from "./SkingroupContentCard";

export default function SkinCard({
  id,
  classId,
  name,
  iconUrl,
  price,
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
}) {
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
          onClick={() =>
            openModal({
              children: <SkingroupContentCard classId={classId} />,
              size: "xl",
            })
          }
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
          onClick={async () => {
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
          }}
        >
          Sell for {price} $
        </Button>
        {rarity === "Classified" ||
        rarity === "Covert" ||
        rarity === "Extraordinary" ? (
          <Button
            variant="default"
            onClick={() =>
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
              })
            }
          >
            Offer on marketplace
          </Button>
        ) : (
          ""
        )}
      </Group>
    </Card>
  );
}
