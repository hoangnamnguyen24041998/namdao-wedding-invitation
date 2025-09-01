import { Sound } from "../../assets";
import useAudioPlayer from "../../hooks/useAudioPlayer";
import "./index.css";
import { Button } from "antd";
import { type RefObject } from "react";

const PlayBackAudio = ({
  triggerRef,
}: {
  triggerRef: RefObject<HTMLAudioElement>;
}) => {
  const { isPlaying } = useAudioPlayer(Sound, triggerRef);

  const togglePlayback = () => {
    const audio = triggerRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <Button
        type="text"
        shape="circle"
        size="large"
        onClick={togglePlayback}
        className={isPlaying ? "pulse" : ""}
        style={{
          border: "none",
          transition: "all 0.2s ease",
        }}
      >
        {isPlaying ? "⏸" : "▶️"}
      </Button>
    </div>
  );
};

export default PlayBackAudio;
