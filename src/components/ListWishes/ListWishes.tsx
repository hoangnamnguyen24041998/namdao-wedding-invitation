import { Typography, Avatar, Button } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css";
import { useS } from "use-s-react";
import Papa from "papaparse";

const ListWishes = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  const [index, setIndex] = useState(0);
  const [submissions, setSubmissions] = useS({
    value: [],
    key: "guest-book",
  });
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % submissions.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [submissions, isAutoScrolling]);

  // Scroll to bottom on index change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [index]);

  // Keyboard navigation (optional)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setIsAutoScrolling(false);
        setIndex((prev) => (prev > 0 ? prev - 1 : submissions.length - 1));
      } else if (e.key === "ArrowRight") {
        setIsAutoScrolling(false);
        setIndex((prev) => (prev + 1) % submissions.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [submissions]);

  const GOOGLE_SHEET_CSV_URL =
    "https://docs.google.com/spreadsheets/d/10fBTFk_T5rq0vXqA8HtOT3UbQP9LO55iH4OoNY8o5Xo/export?format=csv&gid=1100263779";

  const fetchData = useCallback(async () => {
    const response = await fetch(GOOGLE_SHEET_CSV_URL);
    const text = await response.text();
    const result = Papa.parse(text, { header: true });

    const sanitize = (text: string) =>
      text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const cleaned = result.data
      .map((row: any) => ({
        name: sanitize(row["Tên của bạn"]?.trim() || ""),
        wish: sanitize(row["Lời chúc"]?.trim() || ""),
      }))
      .filter((row) => row.name && row.wish);

    const unique = Array.from(
      new Map(
        cleaned.map((item) => [`${item.name}-${item.wish}`, item])
      ).values()
    );

    setSubmissions(unique as any);
  }, [setSubmissions]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  const handlePrev = () => {
    setIsAutoScrolling(false);
    setIndex((prev) => (prev > 0 ? prev - 1 : submissions.length - 1));
  };

  const handleNext = () => {
    setIsAutoScrolling(false);
    setIndex((prev) => (prev + 1) % submissions.length);
  };

  if (submissions.length > 0)
    return (
      <div className="py-10 justify-center md:justify-center items-center md:items-center w-screen">
        <Typography.Title
          level={3}
          className="text-center text-white mb-6"
          data-aos="fade-down"
        >
          💌 Lời chúc từ bạn bè
        </Typography.Title>

        <div className="flex flex-row md:flex-row items-center md:items-center gap-4 justify-center md:justify-center">
          <Button onClick={handlePrev} className="shrink-0 w-full md:w-auto">
            ⬅️
          </Button>

          {/* Wish Content */}
          <div className="w-2/4 mx-50">
            {submissions.slice(index, index + 1).map((wish: any, i: number) => (
              <div
                key={`${wish.name}-${i}`}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-md text-white flex items-start gap-4"
              >
                <Avatar src={`https://i.pravatar.cc/${i}`} />
                <div>
                  <Typography.Text className="font-semibold text-white">
                    {wish.name}
                  </Typography.Text>
                  <br />
                  <Typography.Text className="text-gray-300">
                    {wish.wish}
                  </Typography.Text>
                </div>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <Button onClick={handleNext} className="shrink-0 w-full md:w-auto">
            ➡️
          </Button>
        </div>

        {renderDots()}
      </div>
    );
};

export default ListWishes;
