import { Row, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ImgWedding01, Logo } from "../assets";
import { ReactSVG } from "react-svg";
import YouTubeAudioPlayer from "./playSound";

function TimeWeddingCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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
      className="w-screen h-auto min-h-[50rem] bg-cover bg-center bg-no-repeat flex justify-center sm:px-6 md:px-10 lg:px-20 relative overflow-visible"
      style={{
        backgroundImage: `url(${ImgWedding01})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Row justify="center" align="middle" className="gap-x-4 mt-6">
        <ReactSVG
          src={Logo}
          style={{
            color: "#ffffff",
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "transparent",
            transition: "transform 0.5s ease-in-out",
            zIndex: 9999,
          }}
        />
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 10000,
          }}
        >
          <YouTubeAudioPlayer />
        </div>
      </Row>
      <div className="w-full flex flex-col items-center px-4 pt-20 pb-10 text-center mt-14 sm:mt-16 md:mt-20 lg:mt-24">
        <Typography.Title
          level={1}
          className="text-xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight"
          style={{ color: "#ffffff", fontFamily: "'Great Vibes', cursive" }}
        >
          Xuân Đào & Hoàng Nam
        </Typography.Title>
        <Typography.Title
          level={2}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl mt-4 font-semibold leading-snug"
          style={{ color: "#ffffff" }}
        >
          {dayjs("2025-10-11").format("DD [THÁNG] MM YYYY")}
        </Typography.Title>
        <div className="mt-10 w-full max-w-md px-2">
          <div className="flex flex-row justify-between items-center gap-2 sm:gap-4 md:gap-6">
            {values.map((element, index) => (
              <div
                key={`circle-${index}`}
                className="bg-[#F4146E90] rounded-full shadow-lg flex items-center justify-center
              w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 p-2 sm:p-3 shrink-0"
              >
                <Typography.Text
                  className="text-center text-xs sm:text-sm md:text-base font-semibold leading-tight"
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
      </div>
    </div>
  );
}

export default TimeWeddingCountdown;
