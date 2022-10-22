import { useEffect, useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import Clicker from "../components/Frontpage/Clicker";
import Informations from "../components/Frontpage/Informations";

export default function Home() {
  const [money, setMoney] = useState(0);
  const [moneyPerClick, setMoneyPerClick] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/me");
      if (!response.ok) return;
      const data = await response.json();
      setMoney(data.money);
      setMoneyPerClick(data.moneyPerClick);
    }
    fetchData();
  }, []);

  return (
    <Navigation money={money}>
      <Clicker
        money={money}
        setMoney={setMoney}
        moneyPerClick={moneyPerClick}
        setMoneyPerClick={setMoneyPerClick}
      />

      <Informations />
    </Navigation>
  );
}
