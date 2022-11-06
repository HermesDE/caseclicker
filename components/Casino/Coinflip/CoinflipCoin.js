import { useEffect, useState } from "react";

export default function CoinflipCoin({
  host,
  guest,
  winner,
  setAnimationEnded,
  ready,
  setReady,
}) {
  const [classList, setClassList] = useState("");

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
      setClassList("animation2160");
    } else {
      setClassList("animation1980");
    }

    //setClassList(getSpin());
  }, []);

  useEffect(() => {
    const coin = document.getElementById("coin");
    coin.addEventListener("animationend", () => {
      setAnimationEnded(true);
      setReady(!ready);
    });
  }, []);

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
