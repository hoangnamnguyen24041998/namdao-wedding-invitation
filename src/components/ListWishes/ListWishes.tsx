import { Typography, Avatar, Button, Spin } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css";
import { useS } from "use-s-react";
import { ReactSVG } from "react-svg";
import { IcLeft, IcRight } from "../../assets";

const ListWishes = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useS({
    value: [],
    key: "guest-book",
  });
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const SHEET_ID = "10fBTFk_T5rq0vXqA8HtOT3UbQP9LO55iH4OoNY8o5Xo";
  const RANGE = "ANSWER!A:C"; // Adjust if needed
  const API_KEY = "AIzaSyB5XlYPECGzi-mNOPi5rQj_wcGpzZeDGx4";
  const GOOGLE_SHEET_API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(GOOGLE_SHEET_API_URL);
      const data = await response.json();

      if (!data.values || data.values.length < 2) {
        setSubmissions([]);
        return;
      }

      const rows = data.values.slice(1); // Skip header
      const sanitize = (text: string) =>
        text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

      const cleaned = rows
        .map(([_name, _wish]: any) => ({
          name: sanitize(_name?.trim() || ""),
          wish: sanitize(_wish?.trim() || ""),
        }))
        .filter((rows: any) => rows.name && rows.wish);

      const unique = Array.from(
        new Map(
          cleaned.map((items: any) => [`${items.name}-${items.wish}`, items])
        ).values()
      );

      setSubmissions(unique as any);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  }, [GOOGLE_SHEET_API_URL, setSubmissions]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!isAutoScrolling || submissions.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % submissions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [submissions, isAutoScrolling]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        pauseAutoScroll();
        setIndex((prev) => (prev > 0 ? prev - 1 : submissions.length - 1));
      } else if (e.key === "ArrowRight") {
        pauseAutoScroll();
        setIndex((prev) => (prev + 1) % submissions.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [submissions]);

  const pauseAutoScroll = () => {
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 4000);
  };

  const handlePrev = () => {
    pauseAutoScroll();
    setIndex((prev) => (prev > 0 ? prev - 1 : submissions.length - 1));
  };

  const handleNext = () => {
    pauseAutoScroll();
    setIndex((prev) => (prev + 1) % submissions.length);
  };

  const renderDots = () => (
    <div className="flex justify-center space-x-2 mt-4">
      {submissions.map((_, i) => (
        <div
          key={i}
          className={`h-3 w-3 rounded-full ${
            i === index ? "bg-pink-500 opacity-100" : "bg-gray-300 opacity-50"
          }`}
        />
      ))}
    </div>
  );

  if (submissions.length === 0 && !loading) return null;

  return (
    <div className="py-10 w-full px-4">
      <Typography.Title
        level={3}
        className="text-center text-white mb-6"
        data-aos="fade-down"
      >
        💌 Lời chúc từ bạn bè
      </Typography.Title>

      <div className="flex items-center justify-center gap-4 w-full max-w-screen-md mx-auto">
        <Button
          type="text"
          className="w-12 h-12 p-0 bg-transparent border-none shadow-none"
          onClick={handlePrev}
        >
          <ReactSVG src={IcLeft} className="w-6 h-6" />
        </Button>

        <Spin spinning={loading}>
          <div className="overflow-hidden w-full" ref={scrollRef}>
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${index * 100}%)`,
                width: `${submissions.length * 100}%`,
              }}
            >
              {submissions.map((wish: any, i: number) => (
                <div
                  key={`${wish.name}-${i}`}
                  className="w-full flex-shrink-0 px-4"
                  style={{ width: "100%" }}
                >
                  <div className="h-full bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-md text-white flex items-start gap-4">
                    <Avatar size={48} shape="circle" className="flex-shrink-0">
                      {wish.name.charAt(0)}
                    </Avatar>
                    <div>
                      <Typography.Text className="font-semibold text-white">
                        {wish.name}
                      </Typography.Text>
                      <br />
                      <Typography.Text className="text-gray-300 line-clamp-2">
                        {wish.wish}
                      </Typography.Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Spin>

        <Button
          type="text"
          className="w-12 h-12 p-0 bg-transparent border-none shadow-none"
          onClick={handleNext}
        >
          <ReactSVG src={IcRight} className="w-6 h-6" />
        </Button>
      </div>

      <div className="mt-6">{renderDots()}</div>
    </div>
  );
};

export default ListWishes;
