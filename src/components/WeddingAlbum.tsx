import { Typography, Image } from "antd";
import {
  Album01,
  Img01,
  Img02,
  Img03,
  Img04,
  Img05,
  Img06,
  Img07,
  Img08,
  Img09,
  Img10,
  Img11,
} from "../assets";

const { Title, Text } = Typography;

const albumImages = [
  Img01,
  Img02,
  Img03,
  Album01,
  Img04,
  Img05,
  Img06,
  Img07,
  Img08,
  Img09,
  Img10,
  Img11,
];

const WeddingAlbum = () => {
  return (
    <div className="w-full min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-20">
      <div className="text-center mb-10">
        <Title
          level={3}
          className="!text-pink-600 !font-bold !text-xl sm:!text-2xl lg:!text-3xl"
        >
          Album hình cưới
        </Title>
        <Text className="block text-sm sm:text-base lg:text-lg text-gray-700 italic max-w-2xl mx-auto">
          “Cùng nhau là một từ rất lãng mạn. Cùng nhau trưởng thành, cùng nhau
          già đi, cùng nhau đi khắp thế gian, cùng nhau về chung một nhà.”
        </Text>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Image.PreviewGroup>
          {albumImages.map((src, index) => (
            <div
              key={index}
              className="w-full animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Image
                src={src}
                alt={`Wedding ${index + 1}`}
                fallback="https://via.placeholder.com/300x400?text=Image+Not+Found"
                className="object-cover h-64 w-full rounded-md cursor-pointer"
              />
            </div>
          ))}
        </Image.PreviewGroup>
      </div>
    </div>
  );
};

export default WeddingAlbum;
