import { useState, useEffect } from "react";
import Heart from "./heart";

const HeartRain = ({ isShown = true }: { isShown: boolean }) => {
  const [hearts, setHearts] = useState<
    { id: number; style: React.CSSProperties }[]
  >([]);

  useEffect(() => {
    if (!isShown) return;

    const generateHeart = () => {
      const left = Math.random() * 100;
      const size = 1 + Math.random() * 2.5;

      const style: React.CSSProperties = {
        left: `${left}vw`,
        fontSize: `${size}em`,
        animationDuration: `${3 + Math.random() * 2}s`,
        position: "absolute",
        top: 0,
      };

      const id = Date.now();

      setHearts((prev) => [...prev, { id, style }]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 8000);
    };

    const interval = setInterval(generateHeart, 800);

    return () => clearInterval(interval);
  }, [isShown]);

  if (!isShown) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {hearts.map((heart) => (
        <Heart key={heart.id} style={heart.style} />
      ))}
    </div>
  );
};

export default HeartRain;
