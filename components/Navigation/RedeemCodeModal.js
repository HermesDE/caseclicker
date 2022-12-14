import {
  Alert,
  Button,
  Container,
  FocusTrap,
  Grid,
  Input,
} from "@mantine/core";
import { useState } from "react";

export default function RedeemCodeModal({ codeName }) {
  const [code, setCode] = useState(codeName || "");
  const [res, setRes] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    if (loading) return;
    setLoading(true);
    e.preventDefault();
    const response = await fetch("/api/promocode", {
      method: "POST",
      body: JSON.stringify({ code: code }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setError(false);
      setRes("Promocode successfully redeemed.");
    } else {
      setError(true);
      const data = await response.json();
      setRes(data.error);
    }
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid>
          <Grid.Col span={12}>
            <Input
              data-autoFocus
              value={code}
              onChange={(e) => setCode(e.currentTarget.value)}
            />
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={12}>
            <Button
              disabled={code.split("").length <= 0 || loading}
              loading={loading}
              onClick={handleSubmit}
            >
              Redeem
            </Button>
          </Grid.Col>
        </Grid>
      </form>
      {res && (
        <Alert
          mt={10}
          color={error ? "red" : "green"}
          title={error ? "Error" : "Success"}
          variant="outline"
          withCloseButton
          onClose={() => {
            setRes("");
            setError(null);
          }}
        >
          {res}
        </Alert>
      )}
    </>
  );
}
