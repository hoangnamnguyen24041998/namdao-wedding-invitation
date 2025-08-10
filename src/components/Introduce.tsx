import { Row, Typography, Col } from "antd";
import { ImgHN, ImgXD } from "../assets";

function Introduce() {
  return (
    <div className="w-full bg-white px-6 py-10 sm:px-10 lg:px-20 text-center flex flex-col items-center justify-center">
      <Typography.Title
        level={3}
        className="text-pink-500 font-semibold mb-2 text-lg sm:text-xl md:text-2xl lg:text-3xl"
      >
        Chào bạn thân mến
      </Typography.Title>
      <Typography.Text className="block text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 max-w-xl">
        Chúng tôi rất vui được chia sẻ khoảnh khắc thiêng liêng này cùng bạn –
        một hành trình yêu thương bắt đầu bằng lời hứa trọn đời.
      </Typography.Text>

      <Row
        gutter={[24, 24]}
        className="w-full max-w-6xl flex-wrap mt-8 justify-center"
      >
        <Col
          xs={24}
          sm={12}
          md={10}
          lg={10}
          className="flex flex-col items-center justify-center text-center"
        >
          <div className="flex flex-col items-center">
            <img
              src={ImgHN}
              alt="Hoàng Nam"
              className="w-32 sm:w-36 md:w-40 lg:w-48 rounded-md shadow-md mb-4"
            />
            <div className="text-center">
              <Typography.Text className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
                Hoàng Nam
              </Typography.Text>
              <br />
              <Typography.Text className="text-sm sm:text-base md:text-lg text-gray-600 italic">
                người mang đến sự ấm áp và tiếng cười.
              </Typography.Text>
            </div>
          </div>
        </Col>
        <div className="flex items-center justify-center my-4">
          <span className="text-3xl text-pink-500">❤️</span>
        </div>
        <Col
          xs={24}
          sm={12}
          md={10}
          lg={10}
          className="flex flex-col items-center justify-center text-center"
        >
          <div className="flex flex-col items-center">
            <img
              src={ImgXD}
              alt="Xuân Đào"
              className="w-32 sm:w-36 md:w-40 lg:w-48 rounded-md shadow-md mb-4"
            />
            <div className="text-center">
              <Typography.Text className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
                Xuân Đào
              </Typography.Text>
              <br />
              <Typography.Text className="text-sm sm:text-base md:text-lg text-gray-600 italic">
                người khiến mọi khoảnh khắc trở nên dịu dàng và đáng nhớ.
              </Typography.Text>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Introduce;
