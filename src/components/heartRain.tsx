import { useState, useEffect } from "react";
import Heart from "./heart";

const HeartRain = ({ isShown = true }: { isShown: boolean }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const left = Math.random() * 100;
      const size = 5 + Math.random() * 50;

      const style = {
        left: `${left}vw`,
        fontSize: `${size}px`,
      };

      const id = Date.now();

      const heart = <Heart key={id} style={style} />;
      setHearts((prev) => [...prev, heart] as any);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.key !== String(id)));
      }, 4000);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  if (!isShown) return null;

  return <div>{hearts}</div>;
};

export default HeartRain;
