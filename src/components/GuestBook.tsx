import { useEffect, useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";

const { Title, Text } = Typography;

const GuestbookForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const GOOGLE_FORM_ACTION =
    "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfo9DsxLroPh-_XTAIiq6hcXCPYjXxkV8IX5hVeEsNkVxiHZQ/formResponse";

  const GOOGLE_FORM_FIELDS = {
    name: "entry.770927109",
    wish: "entry.1379562861",
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append(GOOGLE_FORM_FIELDS.name, values.name);
    formData.append(GOOGLE_FORM_FIELDS.wish, values.wish);

    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      message.success("Cảm ơn bạn đã gửi lời chúc!");
      form.resetFields();
    } catch (error) {
      message.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const [wishes, setWishes] = useState([]);
  const [loadingWishes, setLoadingWishes] = useState(true);

  const API_URL =
    "https://script.google.com/macros/s/AKfycbzJa4KXH1QK-BJmcej723u4uk8_u_GvCwO90vLhTkWxuM737DyLSnvqhwGWqwn9W1xrsw/exec";

  useEffect(() => {
    setLoadingWishes(true);
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setWishes(data);
      } catch (error) {
        console.error("Error fetching wishes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setLoading]);

  console.log({ wishes, loadingWishes });

  return (
    <div className="flex items-center justify-center py-10 w-full flex-col pl-8 pr-8">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="text-center mb-6">
          <Title level={3} className="text-pink-600 font-bold">
            Sổ lưu bút 💌
          </Title>
          <Text className="text-gray-700 italic">
            Cảm ơn bạn vì đã gửi những lời chúc tốt đẹp đến đám cưới chúng tôi
          </Text>
        </div>

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Tên của bạn"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên của bạn" }]}
          >
            <Input placeholder="Nhập tên của bạn" />
          </Form.Item>

          <Form.Item
            label="Lời chúc của bạn"
            name="wish"
            rules={[{ required: true, message: "Vui lòng nhập lời chúc" }]}
          >
            <Input.TextArea rows={4} placeholder="Nhập lời chúc của bạn" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-pink-500 hover:bg-pink-600"
            >
              Gửi lời chúc
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default GuestbookForm;
