import { createContext, useState, useEffect } from "react";
import { showNotification } from "@mantine/notifications";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [money, setMoney] = useState(0);
  const [moneyPerClick, setMoneyPerClick] = useState(0);
  const [update, setUpdate] = useState(false);
  const [tokens, setTokens] = useState(0);
  const [userOpenedCases, setUserOpenedCases] = useState(0);
  const [xp, setXp] = useState(0);
  const [rank, setRank] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/me");

      if (!response.ok && response.status !== 401) {
        return showNotification({
          title: "Error",
          message: `Error while fetching user information\nError Message: ${response.status} ${response.statusText}`,
          color: "red",
        });
      }
      const data = await response.json();
      setMoney(data.money);
      setMoneyPerClick(data.moneyPerClick);
      setTokens(data.tokens);
      setUserOpenedCases(data.openedCases);
      setXp(data.xp);
      setRank(data.rank);
    }
    fetchData();
  }, [update]);

  const toggleMoneyUpdate = () => {
    setUpdate(!update);
  };
  return (
    <UserContext.Provider
      value={{
        money,
        setMoney,
        moneyPerClick,
        setMoneyPerClick,
        update,
        setUpdate,
        tokens,
        setTokens,
        userOpenedCases,
        setUserOpenedCases,
        xp,
        setXp,
        rank,
        setRank,
        toggleMoneyUpdate,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
