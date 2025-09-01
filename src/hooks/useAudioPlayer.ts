import { useLayoutEffect, useState } from "react";

const useAudioPlayer = (triggerRef: React.RefObject<HTMLAudioElement>) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useLayoutEffect(() => {
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
