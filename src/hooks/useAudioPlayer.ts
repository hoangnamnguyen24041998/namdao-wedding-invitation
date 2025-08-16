import { useEffect, useRef, useState } from "react";

const useAudioPlayer = (sound: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Define handlers first
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    // Clean up previous audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.removeEventListener("play", handlePlay);
      audioRef.current.removeEventListener("pause", handlePause);
    }

    // Create new audio instance
    const audio = new Audio(sound);
    audio.loop = true;
    audioRef.current = audio;

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Attempt autoplay
    const attemptAutoplay = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.log("Autoplay was prevented. Waiting for user interaction.");
      }
    };

    attemptAutoplay();

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [sound]);

  return { isPlaying, audioRef };
};

export default useAudioPlayer;
