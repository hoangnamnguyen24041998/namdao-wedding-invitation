import { Sound } from "../../assets";
import useAudioPlayer from "../../hooks/useAudioPlayer";
import "./index.css";
import { Button } from "antd";

const PlayBackAudio = ({ triggerRef }: any) => {
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
        type="primary"
        shape="circle"
        size="large"
        onClick={togglePlayback}
        className={isPlaying ? "pulse" : ""}
        style={{
          backgroundColor: "#fefefe90",
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
