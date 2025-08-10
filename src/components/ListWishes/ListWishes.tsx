import { Typography, Avatar, Badge } from "antd";
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

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = index + 1;
      if (nextIndex < submissions.length) {
        setIndex(nextIndex);
      } else {
        setIndex(0);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [submissions, index]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [index]);

  const handleScroll = () => {
    setIsAutoScrolling(false); // User has scrolled manually
  };

  const GOOGLE_SHEET_CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSUpRLXHpjwdozPjInP58FWoac66_zavynrvLCY9eF4qZQq4xywvaiPaXIHLcdt2GBZX1278ZYf3lgi/pub?output=csv";

  const fetchData = useCallback(async () => {
    const response = await fetch(GOOGLE_SHEET_CSV_URL);
    const text = await response.text();
    const result = Papa.parse(text, { header: true });
    const cleaned = result.data
      .filter((row: any) => row["Tên của bạn"] && row["Lời chúc"])
      .map((row: any) => ({
        name: row["Tên của bạn"],
        wish: row["Lời chúc"],
      }));
    console.log({ cleaned });
    setSubmissions(cleaned as any);
  }, [setSubmissions]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderDots = () => {
    return (
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
  };

  if (submissions.length > 0)
    return (
      <div className="w-full max-w-lg mx-auto py-10 px-4">
        <Typography.Title
          level={3}
          className="text-center text-white mb-6"
          data-aos="fade-down"
        >
          💌 Lời chúc từ bạn bè
        </Typography.Title>
        <div
          ref={scrollRef}
          className="max-h-[400px] md:max-h-[500px] overflow-y-auto space-y-4 px-2"
          onScroll={handleScroll} // Detect user scroll
        >
          {submissions.slice(index, index + 1).map((wish: any, i: number) => (
            <div
              key={wish.name}
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
        {!isAutoScrolling && (
          <div className="text-center text-yellow-500 mt-2">
            <Badge count="Manual Scroll Detected" overflowCount={10} />
          </div>
        )}
        {renderDots()}
      </div>
    );
};

export default ListWishes;
