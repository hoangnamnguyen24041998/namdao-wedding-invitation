import { Sound } from "../../assets";
import useAudioPlayer from "../../hooks/useAudioPlayer";
import "./index.css";
import { Button } from "antd";

const PlayBackAudio = () => {
  const { isPlaying, audioRef } = useAudioPlayer(Sound);

  const togglePlayback = () => {
    const audio = audioRef.current;
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
          transition: "all 0.5s ease",
        }}
      >
        {isPlaying ? "⏸" : "▶️"}
      </Button>
    </div>
  );
};

export default PlayBackAudio;
