import { useEffect, useRef, useState } from "react";
import "./coinflip.module.css";

export default function CoinflipAnimation() {
  const ref = useRef();
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
    const coin = document.getElementById("coin");
    coin.addEventListener("animationend", () => {
      console.log("animation ended");
    });
  }, []);

  return (
    <div className="container">
      <div id="coin-flip-cont">
        <div
          id="coin"
          className={classList}
          onClick={() => setClassList(getSpin())}
        >
          <div className="front"></div>
          <div className="back"></div>
        </div>
      </div>
    </div>
  );
}
