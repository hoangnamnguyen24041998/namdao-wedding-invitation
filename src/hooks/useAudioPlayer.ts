import { useEffect, useState } from "react";

const useAudioPlayer = (
  src: string,
  triggerRef: React.RefObject<HTMLAudioElement>
) => {
  useEffect(() => {
    const audio = triggerRef.current;
    if (audio) {
      audio.src = src;
    }
  }, [src, triggerRef]);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = triggerRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [triggerRef]);

  return { isPlaying };
};

export default useAudioPlayer;
