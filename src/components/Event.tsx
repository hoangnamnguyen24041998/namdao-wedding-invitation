import { Card, Typography } from "antd";
import { IcHeart } from "../assets";
import { ReactSVG } from "react-svg";
import { Fragment } from "react";

const listData = [
  {
    id: 1,
    nameEvent: "Tiệc cưới nhà trai",
    placeEventName: "Tư gia nhà trai",
    placeEventAddress: "Xã Đức Hoà Hạ, Huyện Đức Hoà, Tỉnh Long An",
    timeWelcome: "00:00",
    timeEvent: "00:00",
    dateEvent: "Thứ hai, 11.10.25",
  },
  {
    id: 2,
    nameEvent: "Tiệc cưới nhà trai",
    placeEventName: "Tư gia nhà trai",
    placeEventAddress: "Xã Đức Hoà Hạ, Huyện Đức Hoà, Tỉnh Long An",
    timeWelcome: "00:00",
    timeEvent: "00:00",
    dateEvent: "Thứ hai, 11.10.25",
  },
  {
    id: 3,
    nameEvent: "Tiệc cưới nhà trai",
    placeEventName: "Tư gia nhà trai",
    placeEventAddress: "Xã Đức Hoà Hạ, Huyện Đức Hoà, Tỉnh Long An",
    timeWelcome: "00:00",
    timeEvent: "00:00",
    dateEvent: "Thứ hai, 11.10.25",
  },
];

const CardEvent = ({ data }: { data: any }) => {
  return (
    <div className="w-full sm:w-[22rem] flex justify-center items-center p-4">
      <Card
        className="bg-white bg-opacity-10 border border-white/30 shadow-lg backdrop-blur-md w-full"
        style={{
          borderRadius: "16px",
          height: "auto",
        }}
      >
        <div className="text-center space-y-3 py-6 px-4">
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
  return (
    <div className="w-screen h-auto min-h-[40rem] sm:px-6 md:px-10 lg:px-20 bg-cover bg-center bg-no-repeat flex justify-center relative overflow-visible max-w-screen-lg mx-auto">
      <div className="w-screen p-8 bg-[#000000] opacity-45 flex flex-col items-center">
        <Typography.Title
          style={{ color: "#FEFEFE" }}
          className="block text-center text-white italic text-base sm:text-lg"
        >
          Sự kiện cưới
        </Typography.Title>
        <div className="w-screen flex flex-row justify-center items-center gap-8 mt-4 mb-4">
          <div
            style={{
              width: "9.375rem",
              height: "0.063rem",
              backgroundColor: "#fff",
            }}
          />
          <ReactSVG src={IcHeart} />
          <div
            style={{
              width: "9.375rem",
              height: "0.063rem",
              backgroundColor: "#fff",
            }}
          />
        </div>
        <Typography.Text style={{ fontSize: "1.375rem", color: "#ffffff" }}>
          ...tình yêu không phải là nhìn vào nhau, mà là nhìn về chung một
          hướng...
        </Typography.Text>
        <div className="mt-8 w-full flex flex-col sm:flex-row justify-center items-center gap-6">
          {listData.map((item) => (
            <Fragment key={item.id}>
              <CardEvent data={item} />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Event;
