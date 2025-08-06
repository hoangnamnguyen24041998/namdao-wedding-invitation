import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "antd";
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";
import { Sound } from "../assets";

const YouTubeAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(new Audio(Sound));
  const [isPlaying, setIsPlaying] = useState(false);

  // Autoplay and state synchronization effect
  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;

    // Sync React state with the audio element's state for reliability
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // --- Autoplay Logic ---
    let interactionCleanup: (() => void) | null = null;

    const attemptAutoplay = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.log(
          "Autoplay was prevented. Waiting for user interaction to start music."
        );

        const handleFirstInteraction = () => {
          audio.play().catch((err) => {
            console.error("Failed to play on interaction:", err);
          });
          // Clean up the interaction listeners as they are no longer needed.
          interactionCleanup?.();
        };

        const cleanup = () => {
          window.removeEventListener("click", handleFirstInteraction);
          window.removeEventListener("touchend", handleFirstInteraction);
          window.removeEventListener("keydown", handleFirstInteraction);
        };

        window.addEventListener("click", handleFirstInteraction);
        window.addEventListener("touchend", handleFirstInteraction);
        window.addEventListener("keydown", handleFirstInteraction);

        interactionCleanup = cleanup;
      }
    };

    attemptAutoplay();

    return () => {
      audio.pause();
    };
  }, []);

  const togglePlayback = useCallback(async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Could not start playback:", error);
        setIsPlaying(false);
      }
    }
  }, [isPlaying]);

  return (
    <div>
      <Button
        type="text"
        icon={
          isPlaying ? (
            <PauseCircleOutlined
              style={{ color: "#fefefe", fontSize: "1.5rem" }}
            />
          ) : (
            <PlayCircleOutlined
              style={{ color: "#fefefe", fontSize: "1.5rem" }}
            />
          )
        }
        onClick={togglePlayback}
        className="fixed bottom-0 right-0 z-50 bg-[#F4146E] hover:bg-[#d10c5c] p-2 rounded-full transition-colors duration-300"
      />
    </div>
  );
};

export default YouTubeAudioPlayer;
