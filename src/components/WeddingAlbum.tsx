import { Typography, Card, Image } from "antd";
import { Fragment } from "react";
import { Album01 } from "../assets";

const { Title, Text } = Typography;

const albumImages = [Album01, Album01, Album01, Album01, Album01, Album01];

const WeddingAlbum = () => {
  return (
    <div className="w-full min-h-screen bg-white py-10 px-4 sm:px-8 md:px-16">
      <div className="text-center mb-8">
        <Title level={3} className="text-pink-600 font-bold">
          Album hình cưới
        </Title>
        <Text className="block text-base sm:text-lg text-gray-700 italic max-w-2xl mx-auto">
          “Cùng nhau là một từ rất lãng mạn. Cùng nhau trưởng thành, cùng nhau
          già đi, cùng nhau đi khắp thế gian, cùng nhau về chung một nhà.”
        </Text>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {albumImages.map((src, index) => (
          <Fragment key={index}>
            <Card
              hoverable
              cover={
                <Image
                  src={src}
                  alt={`Wedding ${index + 1}`}
                  preview={{
                    mask: <span className="text-white text-sm">Xem</span>,
                  }}
                  className="object-cover h-64 w-full rounded-md"
                />
              }
              className="shadow-md"
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default WeddingAlbum;
