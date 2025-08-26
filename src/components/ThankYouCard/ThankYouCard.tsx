import { Card, Typography, Image } from "antd";
import { Img12 } from "../../assets";
import "./index.css";

const { Title } = Typography;

const ThankYouCard = () => {
  return (
    <div className="thank-you-container">
      <Card bordered={false} className="thank-you-card">
        <div className="photo-wrapper">
          <Image
            src={Img12}
            preview={false}
            alt="Wedding Couple"
            className="w-100 h-100 object-cover rounded-full border-4 border-pink-300 shadow-lg"
          />
        </div>
        <Title level={2} className="thank-you-text">
          Thank you!
        </Title>
      </Card>
    </div>
  );
};

export default ThankYouCard;
