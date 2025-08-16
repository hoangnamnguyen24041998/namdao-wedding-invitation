import { Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo, useState, useRef } from "react";
import { ImgWedding01 } from "../assets";

function TimeWeddingCountdown() {
  const targetDates = useMemo(() => {
    return [
      dayjs("2025-10-11T00:00:00"),
      dayjs("2026-11-01T00:00:00"),
      dayjs("2027-11-09T00:00:00"),
    ];
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTargetIndex, setCurrentTargetIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [bgLoaded, setBgLoaded] = useState(false);
  const [bgImage, setBgImage] = useState();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = new Image();
          img.src = ImgWedding01;
          img.onload = () => {
            setBgImage(ImgWedding01 as any);
            setBgLoaded(true);
          };
          img.onerror = () => {
            setBgLoaded(true);
          };
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
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
  }, [currentTargetIndex, targetDates]);

  const labels = ["Ngày", "Giờ", "Phút", "Giây"];
  const values = [
    timeLeft.days,
    timeLeft.hours,
    timeLeft.minutes,
    timeLeft.seconds,
  ];

  return (
    <div
      ref={containerRef}
      className={`w-screen min-h-screen bg-center bg-no-repeat relative overflow-hidden transition-opacity duration-500 ${
        bgLoaded ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundImage: bgLoaded ? `url(${bgImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000",
        filter: bgLoaded ? "none" : "blur(10px)",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-20 pb-10 text-center">
        <Typography.Title
          level={1}
          className="text-white font-[Great_Vibes] font-extrabold leading-tight mt-28 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[8rem] 2xl:text-[10rem]"
          style={{
            color: "white",
            fontSize: "3.5rem",
            fontFamily: "Great Vibes",
          }}
        >
          Xuân Đào
          <br />&<br />
          Hoàng Nam
        </Typography.Title>
        <div className="mt-5 w-full max-w-md px-2">
          <div className="flex justify-center items-center gap-2 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16">
            {values.map((element, index) => (
              <div
                key={`circle-${index}`}
                className="bg-[#F4146E95] rounded-full shadow-lg flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 p-4 shrink-0"
              >
                <Typography.Text
                  className="text-white text-center font-semibold leading-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
                  style={{ color: "white", fontSize: "1.8rem" }}
                >
                  {element}
                  <br />
                  <span className="block text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                    {labels[index]}
                  </span>
                </Typography.Text>
              </div>
            ))}
          </div>
        </div>
        <Typography.Title
          level={2}
          className="text-white font-bold mt-10 tracking-wide text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl"
          style={{ color: "white" }}
        >
          {dayjs(targetDates[currentTargetIndex]).format("DD [THÁNG] MM YYYY")}
        </Typography.Title>
      </div>
    </div>
  );
}

export default TimeWeddingCountdown;
