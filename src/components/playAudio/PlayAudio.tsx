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
          backgroundColor: "#fefefe50",
          border: "none",
          boxShadow: isPlaying ? "0 0 10px #F4146E" : "none",
          transition: "all 0.3s ease",
        }}
      >
        {isPlaying ? "⏸" : "▶️"}
      </Button>
    </div>
  );
};

export default PlayBackAudio;
