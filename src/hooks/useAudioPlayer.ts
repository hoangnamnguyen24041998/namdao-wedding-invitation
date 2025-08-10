import { useEffect, useRef, useState } from "react";

const useAudioPlayer = (sound: string) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio(sound));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    const attemptAutoplay = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.log("Autoplay was prevented. Waiting for user interaction.");
      }
    };

    attemptAutoplay();

    const handleScroll = async () => {
      if (!isPlaying) {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Failed to play on scroll:", error);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleScroll);

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleScroll);
    };
  }, [isPlaying, sound]);

  return { isPlaying, audioRef };
};

export default useAudioPlayer;
