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
            <PauseCircleOutlined style={{ color: "#fff" }} />
          ) : (
            <PlayCircleOutlined style={{ color: "#fff" }} />
          )
        }
        onClick={togglePlayback}
        className="fixed bottom-0 right-0 z-50 bg-black bg-opacity-60 p-2 rounded-full"
      />
    </div>
  );
};

export default YouTubeAudioPlayer;
