import { Col, ConfigProvider, Row } from "antd";
import "./App.css";
import { Logo } from "./assets";
import HeartRain from "./components/heartRain";
import YouTubeAudioPlayer from "./components/playSound";
import TimeWeddingCountdown from "./components/TimeWeddingCountdown";
import { ReactSVG } from "react-svg";
import Introduce from "./components/Introduce";
import Event from "./components/Event";

function App() {
  return (
    <ConfigProvider>
      <Col>
        <HeartRain isShown={false} />
        <TimeWeddingCountdown />
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <Introduce />
        </div>
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <Event />
        </div>
      </Col>
    </ConfigProvider>
  );
}

export default App;
