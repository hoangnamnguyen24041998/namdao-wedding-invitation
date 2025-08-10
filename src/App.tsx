import { Col, ConfigProvider, Button, Modal } from "antd";
import "./App.css";
import TimeWeddingCountdown from "./components/TimeWeddingCountdown";
import Introduce from "./components/Introduce";
import Event from "./components/Event";
import { HeartRain } from "./components";
import WeddingAlbum from "./components/WeddingAlbum/WeddingAlbum";
import GuestbookForm from "./components/GuestBook";
import ConfirmInvitation from "./components/ConfirmInvitation";
import ListWishes from "./components/ListWishes/ListWishes";
import useAudioPlayer from "./hooks/useAudioPlayer";
import { QR_HN, QR_XD, Sound } from "./assets";
import { useEffect, useState } from "react";

function App() {
  useAudioPlayer(Sound);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

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
          <ConfirmInvitation />
        </div>
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <ListWishes />
        </div>
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <GuestbookForm />
        </div>
        {isVisible && (
          <Button
            type="primary"
            className="scroll-to-top"
            onClick={scrollToTop}
            style={{
              position: "fixed",
              bottom: "20px",
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
        )}
        <Button
          type="primary"
          onClick={toggleModal}
          style={{
            position: "fixed",
            bottom: "90px",
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
        <Modal
          title="Hộp mừng cưới"
          visible={isModalVisible}
          onCancel={toggleModal}
          footer={null}
        >
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-6">
            <div className="money-box bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between w-full md:w-[35rem]">
              <div className="text-content">
                <h3 className="text-2xl font-semibold">Mừng cưới đến chú rể</h3>
                <p className="text-sm">Ngân hàng: Vikki Digital Bank</p>
                <p className="text-sm">Tên tài khoản: Nguyễn Hoàng Nam</p>
                <p className="text-sm">Số tài khoản: 906634281</p>
              </div>
              <div className="qr-container flex justify-center mt-2">
                <img
                  src={QR_HN}
                  alt="QR Code Chú Rể"
                  className="qr-code w-48 h-48 border-2 border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="money-box bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between w-full md:w-[35rem]">
              <div className="text-content">
                <h3 className="text-2xl font-semibold">Mừng cưới đến cô dâu</h3>
                <p className="text-sm">Ngân hàng: MoMo</p>
                <p className="text-sm">Tên tài khoản: Thái Thị Xuân Đào</p>
                <p className="text-sm">Số tài khoản: ******974</p>
              </div>
              <div className="qr-container flex justify-center mt-2">
                <img
                  src={QR_XD}
                  alt="QR Code Cô Dâu"
                  className="qr-code w-48 h-48 border-2 border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </Modal>
      </Col>
    </ConfigProvider>
  );
}

export default App;
