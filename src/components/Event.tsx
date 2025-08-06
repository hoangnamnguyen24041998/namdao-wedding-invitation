import { Card, Typography } from "antd";
import { IcHeart, ImgWedding02 } from "../assets";
import { ReactSVG } from "react-svg";
import { Fragment, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const listData = [
  {
    id: 1,
    nameEvent: "Tiệc cưới nhà trai",
    placeEventName: "Tư gia nhà trai",
    placeEventAddress: "Xã Đức Hoà Hạ, Huyện Đức Hoà, Tỉnh Long An",
    timeWelcome: "10:00",
    timeEvent: "11:00",
    dateEvent: "Thứ hai, 11.10.25",
  },
  {
    id: 2,
    nameEvent: "Tiệc cưới nhà gái",
    placeEventName: "Tư gia nhà gái",
    placeEventAddress: "Xã Tân Phú, Huyện Thanh Bình, Tỉnh Đòng Tháp",
    timeWelcome: "17:00",
    timeEvent: "18:00",
    dateEvent: "Thứ ba, 01.11.25",
  },
  {
    id: 3,
    nameEvent: "Lễ thành hôn",
    placeEventName: "Trung tâm tiệc cưới",
    placeEventAddress: "Gold Palace, 973 Nơ Trang Long, Quận Bình Thạnh",
    timeWelcome: "10:00",
    timeEvent: "11:00",
    dateEvent: "Thứ tư, 09.11.25",
  },
];

const CardEvent = ({ data, onClick }: { data: any; onClick: () => void }) => {
  return (
    <div className="w-full sm:w-[20rem] flex justify-center items-center p-4">
      <Card
        className="bg-white bg-opacity-10 border border-white/30 shadow-lg backdrop-blur-md w-full"
        style={{
          borderRadius: "16px",
        }}
        onClick={onClick}
        data-aos="zoom-in"
      >
        <div className="text-center space-y-3 py-6">
          <Typography.Title
            level={4}
            className="text-white font-bold text-lg sm:text-xl"
          >
            🎉 {data?.nameEvent}
          </Typography.Title>
          <Typography.Text className="block text-white text-base">
            📍 {data?.placeEventName}
          </Typography.Text>
          <Typography.Text className="block text-gray-300 text-sm">
            {data?.placeEventAddress}
          </Typography.Text>
          <div className="mt-4 space-y-2 text-white text-sm sm:text-base">
            <Typography.Text>🕰️ Đón khách: {data?.timeWelcome}</Typography.Text>
            <br />
            <Typography.Text>🍽️ Khai tiệc: {data?.timeEvent}</Typography.Text>
            <br />
            <Typography.Text>📅 {data?.dateEvent}</Typography.Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

function Event() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="w-full bg-cover bg-center bg-no-repeat relative overflow-visible px-4 sm:px-6 md:px-10 lg:px-20 py-10">
      <div
        className="bg-transparent rounded-xl p-8 flex flex-col items-center text-center"
        style={{
          backgroundImage: `url(${ImgWedding02})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
          objectFit: "cover",
        }}
      >
        <Typography.Title
          data-aos="fade-up"
          style={{
            color: "#fff",
            fontWeight: 600,
            textShadow: "0 1px 3px rgba(0,0,0,0.6)",
          }}
          className="italic text-lg sm:text-xl md:text-2xl"
        >
          Sự kiện cưới
        </Typography.Title>
        <div className="flex flex-row items-center justify-center gap-4 mt-4 mb-4 w-full max-w-md">
          <div className="flex-grow h-0.5 bg-white rounded-2xl" />
          <ReactSVG src={IcHeart} className="w-6 h-6 text-pink-500" />
          <div className="flex-grow h-0.5 bg-white rounded-2xl" />
        </div>
        <Typography.Text
          className="text-white text-base sm:text-lg max-w-md"
          style={{ color: "#ffffff", fontWeight: 700 }}
        >
          ...tình yêu không phải là nhìn vào nhau, mà là nhìn về chung một
          hướng...
        </Typography.Text>
        <div className="mt-8 w-full flex flex-wrap justify-center items-stretch gap-6">
          {listData.map((item) => (
            <Fragment key={item.id} data-aos="zoom-in">
              <CardEvent
                data={item}
                onClick={() => setSelectedLocation(item.placeEventAddress)}
              />
            </Fragment>
          ))}
        </div>
        {selectedLocation && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
            data-aos="fade-up"
          >
            <div className="bg-white rounded-lg p-4 w-full max-w-2xl shadow-xl relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
                onClick={() => setSelectedLocation(null)}
              >
                ✖
              </button>
              <Typography.Title level={4}>Bản đồ địa điểm</Typography.Title>
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  selectedLocation
                )}&output=embed`}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Event;
