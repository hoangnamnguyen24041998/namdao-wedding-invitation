import { useEffect, useRef, useState } from "react";

const useAudioPlayer = (
  sound: string,
  triggerRef: React.RefObject<HTMLElement>
) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasPlayed = useRef(false);

  useEffect(() => {
    const audio = new Audio(sound);
    audio.loop = true;
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    const triggerPlay = async () => {
      if (hasPlayed.current || !audio.paused) return;
      hasPlayed.current = true;
      try {
        await audio.play();
        console.log("Audio started");
      } catch (err) {
        console.error("Audio play failed:", err);
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (triggerRef.current?.contains(e.target as Node)) {
        triggerPlay();
      }
    };

    window.addEventListener("click", handleClick, { once: true });

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      window.removeEventListener("click", handleClick);
    };
  }, [sound, triggerRef]);

  return { isPlaying, audioRef };
};

export default useAudioPlayer;
