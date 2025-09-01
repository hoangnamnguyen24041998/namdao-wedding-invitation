import useAudioPlayer from "../../hooks/useAudioPlayer";
import "./index.css";
import { Button } from "antd";
import type { RefObject } from "react";

const PlayBackAudio = ({
  triggerRef,
  source,
}: {
  triggerRef: RefObject<HTMLAudioElement>;
  source?: string;
}) => {
  const { isPlaying } = useAudioPlayer(triggerRef);

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
        <audio ref={triggerRef} src={source} loop />
        {isPlaying ? "⏸" : "▶️"}
      </Button>
    </div>
  );
};

export default PlayBackAudio;
