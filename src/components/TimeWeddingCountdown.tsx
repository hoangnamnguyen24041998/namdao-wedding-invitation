import { Row, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ImgWedding01 } from "../assets";
import YouTubeAudioPlayer from "./playSound";

function TimeWeddingCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = ImgWedding01; // Preload the image
    img.onload = () => setBgLoaded(true);
  }, []);

  useEffect(() => {
    const targetDate = dayjs("2025-10-11T00:00:00");
    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.valueOf() - now.getTime();

      const totalSeconds = Math.max(0, Math.floor(diff / 1000));
      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const labels = ["Ngày", "Giờ", "Phút", "Giây"];
  const values = [
    timeLeft.days,
    timeLeft.hours,
    timeLeft.minutes,
    timeLeft.seconds,
  ];

  return (
    <div
      className={`w-screen h-auto min-h-[100vh] bg-center bg-no-repeat relative overflow-hidden transition-opacity duration-1000 ${
        bgLoaded ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundImage: `url(${ImgWedding01})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000", // Fallback color while loading
        transition: "opacity 1s ease-in-out",
        opacity: bgLoaded ? 1 : 0.5,
        filter: bgLoaded ? "none" : "blur(10px)",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-20 pb-10 text-center">
        <Row justify="center" align="middle" className="gap-x-4 mt-6">
          <div
            style={{
              position: "fixed",
              top: "1rem",
              right: "1rem",
              zIndex: 10000,
            }}
          >
            <YouTubeAudioPlayer />
          </div>
        </Row>

        <Typography.Title
          level={1}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mt-28"
          style={{ color: "#ffffff", fontFamily: "'Great Vibes', cursive" }}
        >
          Xuân Đào
          <br />&<br />
          Hoàng Nam
        </Typography.Title>
        <div className="mt-5 w-full max-w-md px-2">
          <div className="flex flex-row justify-center items-center gap-1 sm:gap-2 md:gap-2 lg:gap-4">
            {values.map((element, index) => (
              <div
                key={`circle-${index}`}
                className="bg-[#F4146E95] rounded-full shadow-lg flex items-center justify-center
                w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 p-2 sm:p-3 shrink-0"
              >
                <Typography.Text
                  className="text-center text-2xl sm:text-2xl md:text-base font-semibold leading-tight"
                  style={{ color: "#ffffff" }}
                >
                  {element}
                  <br />
                  {labels[index]}
                </Typography.Text>
              </div>
            ))}
          </div>
        </div>
        <Typography.Title
          level={2}
          className="text-base sm:text-lg md:text-xl lg:text-2xl mt-4 font-semibold leading-snug"
          style={{ color: "#ffffff" }}
        >
          {dayjs("2025-10-11").format("DD [THÁNG] MM YYYY")}
        </Typography.Title>
      </div>
    </div>
  );
}

export default TimeWeddingCountdown;
