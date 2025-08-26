import { Typography, Image, Col } from "antd";
import { Img12 } from "../../assets";

const { Title } = Typography;

const ThankYouCard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Col className="bg-white p-6 max-w-md w-full">
        <div className="flex justify-center mb-4">
          <Image
            src={Img12}
            preview={false}
            alt="Wedding Couple"
            className="w-40 h-40 object-cover rounded-full border-4 border-pink-300 shadow-lg"
          />
        </div>
        <Title
          level={2}
          className="text-center text-pink-600 font-semibold mb-0"
        >
          Thank you!
        </Title>
      </Col>
    </div>
  );
};

export default ThankYouCard;
