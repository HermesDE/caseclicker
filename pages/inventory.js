import InventoryShowcase from "../components/Inventory/InventoryShowcase";
import Navigation from "../components/Navigation/Navigation";
import { useState, useEffect } from "react";

export default function Inventory() {
  const [money, setMoney] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/me");
      if (!response.ok) return;
      const data = await response.json();
      setMoney(data.money);
    }
    fetchData();
  }, []);
  return (
    <Navigation money={money}>
      <InventoryShowcase />
    </Navigation>
  );
}
