import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "antd";
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";
import { Sound } from "../assets";

const YouTubeAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [clicked, setClicked] = useState(false);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(Sound);

    const handleUserInteraction = () => {
      setCanPlay(true);
      window.removeEventListener("click", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  const togglePlayback = useCallback(() => {
    if (!audioRef.current || !canPlay) return;

    if (clicked) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setClicked((prev) => !prev);
  }, [clicked, canPlay]);

  return (
    <div>
      <Button
        type="text"
        icon={
          clicked ? (
            <PauseCircleOutlined style={{ color: "#fff" }} />
          ) : (
            <PlayCircleOutlined style={{ color: "#fff" }} />
          )
        }
        onClick={togglePlayback}
        className={`px-6 py-3 rounded-full text-white font-bold transition-all duration-300 no-hover`}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        style={{
          backgroundColor: "#333333",
        }}
      />
    </div>
  );
};

export default YouTubeAudioPlayer;
