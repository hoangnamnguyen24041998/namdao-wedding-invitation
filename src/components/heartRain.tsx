import { useState, useEffect } from "react";
import Heart from "./heart";

const HeartRain = ({ isShown = true }: { isShown: boolean }) => {
  const [hearts, setHearts] = useState<
    { id: number; style: React.CSSProperties }[]
  >([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const left = Math.random() * 20;
      const size = 10 + Math.random() * 50;

      const style = {
        left: `${left}vw`,
        fontSize: `${size}px`,
      };

      const id = Date.now();

      setHearts((prev) => [...prev, { id, style }]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 4000);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  if (!isShown) return null;
  if (!isShown) return null;

  return (
    <div>
      {hearts.map((heart) => (
        <Heart key={heart.id} style={heart.style} />
      ))}
    </div>
  );
}

export default HeartRain;
