import InventoryShowcase from "../components/Inventory/InventoryShowcase";
import Navigation from "../components/Navigation/Navigation";
import { useState, useEffect } from "react";

export default function Inventory() {
  const [money, setMoney] = useState(0);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/me");

      if (!response.ok) {
        showNotification({
          title: "Error",
          message: `Error while fetching user information\nError Message: ${response.status} ${response.statusText}`,
        });
        return;
      }
      const data = await response.json();
      setMoney(data.money);
    }
    fetchData();
  }, [update]);

  const toggleMoneyUpdate = () => {
    setUpdate(!update);
  };
  return (
    <Navigation money={money}>
      <InventoryShowcase toggleMoneyUpdate={toggleMoneyUpdate} />
    </Navigation>
  );
}
