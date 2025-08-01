import { Col, ConfigProvider } from "antd";
import "./App.css";
import TimeWeddingCountdown from "./components/TimeWeddingCountdown";
import Introduce from "./components/Introduce";
import Event from "./components/Event";
import { HeartRain } from "./components";
import WeddingAlbum from "./components/WeddingAlbum";
import RSVPForm from "./components/ConfirmInvitation";
import GuestbookForm from "./components/GuestBook";

function App() {
  return (
    <ConfigProvider>
      <Col>
        <HeartRain isShown />
        <TimeWeddingCountdown />
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <Introduce />
        </div>
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <Event />
        </div>
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <WeddingAlbum />
        </div>
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <RSVPForm />
        </div>
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <GuestbookForm />
        </div>
      </Col>
    </ConfigProvider>
  );
}

export default App;
