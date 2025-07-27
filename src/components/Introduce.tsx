import { Row, Typography, Col } from "antd";
import { IcHeart, ImgHN, ImgXD } from "../assets";
import { ReactSVG } from "react-svg";

function Introduce() {
  return (
    <div className="w-full bg-white px-6 py-10 sm:px-10 lg:px-20 text-center flex flex-col items-center justify-center">
      <Typography.Title
        level={3}
        className="text-pink-500 font-semibold mb-2 text-lg sm:text-xl md:text-2xl"
      >
        Chào bạn
      </Typography.Title>
      <Typography.Text className="block text-base sm:text-lg md:text-xl text-gray-700 mb-6">
        Mời bạn cùng chúng tôi đánh dấu khoảnh khắc trọng đại của cuộc đời
      </Typography.Text>
      <Row
        justify="center"
        align="middle"
        className="w-full flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-12"
      >
        <Row className="flex flex-col items-center gap-8">
          <Typography.Text className="mt-2 text-2xl sm:text-base font-medium text-white">
            Hoàng Nam
            <br />
            <Typography.Text>Mình là Nam</Typography.Text>
          </Typography.Text>
          <img
            src={ImgHN}
            alt="Hoàng Nam"
            className="w-28 sm:w-32 md:w-36 lg:w-40 rounded-md"
          />
        </Row>
        <Col className="flex items-center justify-center">
          <ReactSVG
            src={IcHeart}
            className="w-8 h-8 sm:w-10 sm:h-10 text-pink-500"
          />
        </Col>
        <Row className="flex flex-col items-center gap-8">
          <img
            src={ImgXD}
            alt="Xuân Đào"
            className="w-28 sm:w-32 md:w-36 lg:w-40 rounded-md"
          />
          <Typography.Text className="mt-2 text-sm sm:text-base font-medium text-white">
            Xuân Đào
            <br />
            <Typography.Text>Mình là Xuân Đào</Typography.Text>
          </Typography.Text>
        </Row>
      </Row>
    </div>
  );
}

export default Introduce;
