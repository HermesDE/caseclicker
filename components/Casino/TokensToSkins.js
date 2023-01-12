import { NumberInput, Button, Group } from "@mantine/core";
import TokensIcon from "../icons/TokensIcon";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { openModal } from "@mantine/modals";
import UnboxedSkinsCarousel from "../Cases/UnboxedSkinsCarousel";

export default function TokensToSkins({
  tokens,
  setTokens,
  toggleMoneyUpdate,
}) {
  const [tokensToConvert, setTokensToConvert] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const body = {
      tokens: tokensToConvert,
    };
    const response = await fetch("/api/casino/tokensToSkins", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      showNotification({
        title: "Error",
        message: "Error while converting your tokens to skins",
        color: "red",
      });
      setLoading(false);
      return;
    }
    const { skins } = await response.json();

    setTokens((tokens -= tokensToConvert));
    openModal({
      title: "Your converted skins",
      children: <UnboxedSkinsCarousel skins={skins} />,
      size: skins.length === 1 ? "xl" : "100%",
    });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group align={"flex-end"}>
        <NumberInput
          label="Tokens"
          description="Amount of tokens that will be converted into skins"
          icon={<TokensIcon color={"yellow"} />}
          value={tokensToConvert}
          onChange={(value) => {
            if (isNaN(value)) return;
            if (value > tokens) return;
            const regex = new RegExp("^[0-9]*$");
            if (!regex.exec(value)) return;

            setTokensToConvert(value);
          }}
          min={1}
          max={Math.floor(tokens)}
          stepHoldDelay={500}
          stepHoldInterval={50}
        />
        <Button
          color={"orange"}
          variant="outline"
          loading={loading}
          disabled={loading || tokensToConvert > tokens}
          onClick={handleSubmit}
        >
          Convert
        </Button>
      </Group>
    </form>
  );
}
