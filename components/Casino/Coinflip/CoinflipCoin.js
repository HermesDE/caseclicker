import { useEffect, useState } from "react";

export default function CoinflipCoin({
  gameId,
  host,
  guest,
  winner,
  setAnimationEnded,
  toggleUserStats,
}) {
  const [classList, setClassList] = useState(gameId);

  const spinArray = [
    "animation1620",
    "animation1800",
    "animation1980",
    "animation2160",
  ];
  const getSpin = () => {
    return spinArray[Math.floor(Math.random() * spinArray.length)];
  };

  useEffect(() => {
    if (!winner) return;

    if (winner === "host") {
      setClassList((current) => [...current, " animation2160"]);
    } else {
      setClassList((current) => [...current, " animation1980"]);
    }

    //setClassList(getSpin());
  }, [winner]);

  useEffect(() => {
    const coin = document.getElementsByClassName(gameId);
    coin[0].addEventListener("animationend", () => {
      toggleUserStats();
      setAnimationEnded(true);
    });
  }, [gameId, setAnimationEnded, toggleUserStats]);

  return (
    <div className="container">
      <div id="coin-flip-cont">
        <div id="coin" className={classList}>
          <div
            className="front"
            style={{
              background: `url(${host.image})`,
              backgroundSize: "contain",
            }}
          ></div>
          <div
            className="back"
            style={{
              background: `url(${guest.image})`,
              backgroundSize: "contain",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
