import { Typography, Avatar } from "antd";
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

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = index + 1;
      if (nextIndex <= submissions.length - 1) {
        const slice = submissions.slice(
          Math.max(0, nextIndex - 5),
          nextIndex + 1
        );
        setSubmissions(slice);
        setIndex(nextIndex);
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [submissions, index, setSubmissions]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [submissions]);

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

  if (submissions.length > 0)
    return (
      <div className="w-full max-w-md mx-auto py-10 px-4">
        <Typography.Title
          level={3}
          className="text-center text-white mb-6"
          data-aos="fade-down"
        >
          💌 Lời chúc từ bạn bè
        </Typography.Title>
        <div
          ref={scrollRef}
          className="max-h-96 overflow-y-auto space-y-4 px-2"
        >
          {submissions.map((wish: any, i: number) => (
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
      </div>
    );
};

export default ListWishes;
