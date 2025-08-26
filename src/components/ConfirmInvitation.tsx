import { useState, useEffect } from "react";
import { Form, Input, Radio, Button, Typography, message } from "antd";
import { ImgBG } from "../assets";
import { useS } from "use-s-react";
import AOS from "aos";
import "aos/dist/aos.css";

const { Title } = Typography;

const ConfirmInvitation = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [_, setSubmissions] = useS({
    value: [],
    key: "confirm-join",
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const FORM_ID = "1FAIpQLSdGOYUlrGi4yXccmV59ED645X-KuJANTFmaZb4Ry3Xqw1boMw";
  const GOOGLE_FORM_ACTION = `https://docs.google.com/forms/u/0/d/e/${FORM_ID}/formResponse`;

  const GOOGLE_FORM_FIELDS = {
    name: "entry.1704380466",
    attendance: "entry.309234374",
    quantity: "entry.1442013422",
    side: "entry.1704380466",
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append(GOOGLE_FORM_FIELDS.name, values.name);
    formData.append(GOOGLE_FORM_FIELDS.attendance, values.attendance);
    formData.append(GOOGLE_FORM_FIELDS.quantity, values.quantity);
    formData.append(GOOGLE_FORM_FIELDS.side, values.side);

    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      setSubmissions((prev) => [...prev, values]);
      message.success("Cảm ơn bạn đã xác nhận!");
      form.resetFields();
    } catch (error) {
      message.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center py-10 px-4 sm:px-6 lg:px-20 w-full"
      style={{
        backgroundImage: `url(${ImgBG})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      data-aos="fade-in"
    >
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg">
        <Title level={3} className="text-center text-pink-600 mb-6">
          Xác nhận tham dự
        </Title>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label={
              <span className="font-semibold text-base sm:text-lg text-gray-800">
                Tên khách mời
              </span>
            }
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input placeholder="Nhập họ tên của bạn" />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-semibold text-base sm:text-lg text-gray-800">
                Số lượng người tham dự
              </span>
            }
            name="quantity"
            rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
          >
            <Input type="number" min={1} placeholder="Ví dụ: 2" />
          </Form.Item>

          <Form.Item
            label=""
            name="side"
            rules={[{ required: true, message: "Vui lòng chọn một lựa chọn" }]}
          >
            <Radio.Group>
              <Radio value="Cô dâu">Khách của Cô dâu</Radio>
              <Radio value="Chú rể">Khách của Chú rể</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label={
              <span className="font-semibold text-base sm:text-lg text-gray-800">
                Xác nhận tham dự
              </span>
            }
            name="attendance"
            rules={[{ required: true, message: "Vui lòng chọn một lựa chọn" }]}
          >
            <Radio.Group>
              <Radio value="Tham dự">Có, tôi sẽ tham dự</Radio>
              <Radio value="Không tham dự">
                Tôi bận, rất tiếc không thể tham dự
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Button
            htmlType="submit"
            loading={loading}
            type="primary"
            style={{
              backgroundColor: "rgb(219, 39, 119)",
            }}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold border-none rounded-lg shadow-md transition duration-300 "
          >
            <span className="font-semibold text-base sm:text-lg text-gray-800 text-white">
              Xác nhận
            </span>
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ConfirmInvitation;
