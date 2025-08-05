import { useCallback, useRef, useState } from "react";
import { Button } from "antd";
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";
import { Sound } from "../assets";

const YouTubeAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(new Audio(Sound));
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying((prev) => !prev);
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
