import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "antd";
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";
import { Sound } from "../assets";

const YouTubeAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [clicked, setClicked] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(Sound);
    audioRef.current.loop = true;

    const tryAutoplay = async () => {
      try {
        await audioRef.current?.play();
        setClicked(true);
        setCanPlay(true);
      } catch (err) {
        const handleUserInteraction = () => {
          setCanPlay(true);
          window.removeEventListener("click", handleUserInteraction);
        };
        window.addEventListener("click", handleUserInteraction);
      }
    };

    tryAutoplay();

    return () => {
      window.removeEventListener("click", () => {});
      audioRef.current?.pause();
    };
  }, []);
  useEffect(() => {
    audioRef.current = new Audio(Sound);
    audioRef.current.loop = true;

    const handleUserInteraction = async () => {
      try {
        await audioRef.current?.play();
        setClicked(true);
        setCanPlay(true);
      } catch (err) {
        console.warn("Autoplay blocked:", err);
      }
      window.removeEventListener("click", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      audioRef.current?.pause();
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
    setClicked(true);
    setCanPlay(true);
    setFadeOut(true);
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
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        className={`fixed inset-0 bg-black opacity-80 flex items-center justify-center z-50 transition-opacity duration-1000 ${
          fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />
    </div>
  );
};

export default YouTubeAudioPlayer;
