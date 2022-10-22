import CaseShowcase from "../components/Cases/CaseShowcase";
import Navigation from "../components/Navigation/Navigation";
import { useState, useEffect } from "react";

export default function Cases() {
  const [money, setMoney] = useState(0);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/me");
      if (!response.ok) return;
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
      <CaseShowcase toggleMoneyUpdate={toggleMoneyUpdate} />
    </Navigation>
  );
}
