import { Typography, Image } from "antd";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import { Img03 } from "../assets";

const { Title, Paragraph } = Typography;

const IntroMessage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      className="w-full px-4 py-10 bg-gradient-to-b from-pink-50 to-white"
      data-aos="fade-up"
    >
      <div className="max-w-3xl mx-auto text-center">
        <Title level={3} className="text-pink-600 mb-4">
          💌 Lời Ngỏ
        </Title>
        <Paragraph className="text-gray-700 text-lg whitespace-pre-line leading-relaxed">
          Bằng tất cả sự trân trọng chúng con xin cám ơn tất cả những người thân
          yêu, cô dì, chú bác, anh chị em, bạn bè và đồng nghiệp của tụi con/tụi
          em.
          {"\n\n"}
          Tụi con/tụi em biết mọi người rất bận rộn, bận rộn với công việc, tất
          bật với gia đình…
          {"\n\n"}
          Nhưng vẫn giành chút thời gian quý báu và những sự yêu thương để chúc
          mừng tình yêu và hạnh phúc của tụi con/tụi em.
          {"\n\n"}
          Một lần nữa xin chân thành cảm ơn tất cả mọi người và hẹn gặp mọi
          người vào ngày trọng đại sắp tới !!!
        </Paragraph>

        <div className="mt-8">
          <Image
            src={Img03}
            alt="Ảnh cô dâu chú rể"
            className="rounded-xl shadow-lg"
            width={300}
            preview={false}
          />
        </div>
      </div>
    </div>
  );
};

export default IntroMessage;
