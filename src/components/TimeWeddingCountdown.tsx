import { Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ImgWedding01 } from "../assets";

function TimeWeddingCountdown() {
  const targetDates = [
    dayjs("2025-10-11T00:00:00"),
    dayjs("2026-11-01T00:00:00"),
    dayjs("2027-11-09T00:00:00"),
  ];

  const [currentTargetIndex, setCurrentTargetIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [bgLoaded, setBgLoaded] = useState(false);
  const [bgImage, setBgImage] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = ImgWedding01; // Preload the image
    img.onload = () => {
      setBgImage(ImgWedding01 as any);
      setBgLoaded(true);
    };
    img.onerror = () => {
      // Handle error if needed
      setBgLoaded(true); // Fallback to loaded state
    };
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const targetDate = targetDates[currentTargetIndex];
      const now = dayjs();
      const diff = targetDate.valueOf() - now.valueOf();

      if (diff <= 0 && currentTargetIndex < targetDates.length - 1) {
        setCurrentTargetIndex((prevIndex) => prevIndex + 1);
      }

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
  }, [currentTargetIndex]);

  const labels = ["Ngày", "Giờ", "Phút", "Giây"];
  const values = [
    timeLeft.days,
    timeLeft.hours,
    timeLeft.minutes,
    timeLeft.seconds,
  ];

  return (
    <div
      className={`w-screen h-auto min-h-[100vh] bg-center bg-no-repeat relative overflow-hidden transition-opacity duration-500 ${
        bgLoaded ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundImage: bgLoaded ? `url(${bgImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000", // Fallback color while loading
        filter: bgLoaded ? "none" : "blur(10px)",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-20 pb-10 text-center">
        <Typography.Title
          level={1}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-extrabold leading-tight mt-28"
          style={{ color: "#ffffff", fontFamily: "'Great Vibes', cursive" }}
        >
          Xuân Đào
          <br />&<br />
          Hoàng Nam
        </Typography.Title>
        <div className="mt-5 w-full max-w-md px-2">
          <div className="flex flex-row justify-center items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
            {values.map((element, index) => (
              <div
                key={`circle-${index}`}
                className="bg-[#F4146E95] rounded-full shadow-lg flex items-center justify-center
                w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 p-3 sm:p-4 shrink-0"
              >
                <Typography.Text
                  className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight"
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
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mt-4 font-semibold leading-snug"
          style={{ color: "#ffffff" }}
        >
          {dayjs(targetDates[currentTargetIndex]).format("DD [THÁNG] MM YYYY")}
        </Typography.Title>
      </div>
    </div>
  );
}

export default TimeWeddingCountdown;
