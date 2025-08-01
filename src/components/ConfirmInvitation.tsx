import { useState } from "react";
import { Form, Input, Radio, Button, Typography, message } from "antd";

const { Title } = Typography;

const RSVPForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const FORM_ID = "1FAIpQLSdGOYUlrGi4yXccmV59ED645X-KuJANTFmaZb4Ry3Xqw1boMw";

  const GOOGLE_FORM_ACTION = `https://docs.google.com/forms/u/0/d/e/${FORM_ID}/formResponse`;

  const GOOGLE_FORM_FIELDS = {
    name: "entry.1704380466",
    attendance: "entry.309234374",
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append(GOOGLE_FORM_FIELDS.name, values.name);
    formData.append(GOOGLE_FORM_FIELDS.attendance, values.attendance);

    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      message.success("Cảm ơn bạn đã xác nhận!");
      form.resetFields();
    } catch (error) {
      message.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-10 w-full flex-col pl-8 pr-8">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <Title level={3} className="text-center text-pink-600 mb-6">
          Xác nhận tham dự
        </Title>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Họ tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input placeholder="Nhập họ tên của bạn" />
          </Form.Item>

          <Form.Item
            label="Xác nhận tham dự"
            name="attendance"
            rules={[{ required: true, message: "Vui lòng chọn một lựa chọn" }]}
          >
            <Radio.Group>
              <Radio value="Tham dự">Tham dự</Radio>
              <Radio value="Không tham dự">Không tham dự</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-pink-500 hover:bg-pink-600"
            >
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RSVPForm;
