import { Card, Typography } from "antd";
import { IcHeart, ImgWedding02 } from "../assets";
import { ReactSVG } from "react-svg";
import { Fragment } from "react";

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
    placeEventAddress: "Phường 5, Quận 8, TP. Hồ Chí Minh",
    timeWelcome: "17:00",
    timeEvent: "18:00",
    dateEvent: "Thứ ba, 12.10.25",
  },
  {
    id: 3,
    nameEvent: "Lễ thành hôn",
    placeEventName: "Trung tâm tiệc cưới",
    placeEventAddress: "Quận 1, TP. Hồ Chí Minh",
    timeWelcome: "18:00",
    timeEvent: "19:00",
    dateEvent: "Thứ tư, 13.10.25",
  },
];

const CardEvent = ({ data }: { data: any }) => {
  return (
    <div className="w-full sm:w-[20rem] flex justify-center items-center p-4">
      <Card
        className="bg-white bg-opacity-10 border border-white/30 shadow-lg backdrop-blur-md w-full"
        style={{
          borderRadius: "16px",
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
    <div className="w-full bg-cover bg-center bg-no-repeat relative overflow-visible px-4 sm:px-6 md:px-10 lg:px-20 py-10">
      <div
        className="w-full max-w-screen-xl mx-auto bg-black opacity-50 rounded-xl p-8 flex flex-col items-center text-center"
        style={{
          backgroundImage: `url(${ImgWedding02})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Typography.Title
          style={{ color: "#fff", fontWeight: 500 }}
          className="text-white italic text-lg sm:text-xl md:text-2xl"
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
