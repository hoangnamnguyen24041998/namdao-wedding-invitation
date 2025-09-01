import { Typography, Image } from "antd";
import { Img12 } from "../../assets";

const { Title } = Typography;

const ThankYouCard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-xl w-full max-w-md">
        <div className="flex justify-center mb-4">
          <Image
            src={Img12}
            preview={false}
            alt="Wedding Couple"
            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full border-4 border-pink-300"
          />
        </div>
        <Title
          level={2}
          className="text-center text-pink-600 font-semibold mb-0 text-xl sm:text-2xl"
        >
          Thank you!
        </Title>
      </div>
    </div>
  );
};

export default ThankYouCard;
