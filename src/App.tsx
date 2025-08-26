import { Col, ConfigProvider, Button } from "antd";
import "./App.css";
import TimeWeddingCountdown from "./components/TimeWeddingCountdown";
import Introduce from "./components/Introduce";
import Event from "./components/Event";
import { HeartRain } from "./components";
import WeddingAlbum from "./components/WeddingAlbum/WeddingAlbum";
import GuestbookForm from "./components/GuestBook";
import ConfirmInvitation from "./components/ConfirmInvitation";
import ListWishes from "./components/ListWishes/ListWishes";
import { useRef, useState } from "react";
import PlayBackAudio from "./components/playAudio/PlayAudio";
import MoneyBoxModal from "./components/MoneyBoxModal";
import ThankYouCard from "./components/ThankYouCard/ThankYouCard";
import AutoScrollMobile from "./components/AutoScrollMobile";
import IntroMessage from "./components/IntroMessage";

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <ConfigProvider>
      <Col ref={triggerRef}>
        <AutoScrollMobile />
        <div
          style={{
            position: "fixed",
            top: "0.5rem",
            right: "1.5rem",
            zIndex: 1000,
            borderRadius: "50%",
          }}
        >
          <PlayBackAudio triggerRef={triggerRef} />
        </div>
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
          <IntroMessage />
        </div>
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <ConfirmInvitation />
        </div>
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <ListWishes />
        </div>
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <GuestbookForm />
        </div>
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <ThankYouCard />
        </div>
        <Button
          type="primary"
          className="scroll-to-top"
          onClick={scrollToTop}
          style={{
            position: "fixed",

            bottom: "160px",
            right: "20px",
            zIndex: 1000,
            backgroundColor: "#00000080",
            height: "3.5rem",
            width: "3.5rem",
            fontSize: "1.5rem",
          }}
        >
          ↑
        </Button>
        <Button
          type="primary"
          onClick={scrollToBottom}
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            zIndex: 1000,
            backgroundColor: "#00000080",
            height: "3.5rem",
            width: "3.5rem",
            borderRadius: 8,
            fontSize: "1.5rem",
          }}
        >
          ↓
        </Button>
        <Button
          type="primary"
          onClick={toggleModal}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
            backgroundColor: "#F08FFF80",
            height: "3.5rem",
            width: "3.5rem",
            borderRadius: 1000,
            fontSize: "1.5rem",
          }}
        >
          $
        </Button>

        <MoneyBoxModal {...{ isModalVisible, toggleModal }} />
      </Col>
    </ConfigProvider>
  );
}

export default App;
