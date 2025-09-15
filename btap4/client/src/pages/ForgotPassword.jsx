import { useState } from "react";
import { Card, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../util/api";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await api.post("/api/forgot-password", { email: values.email });
      
      message.success("Link đặt lại mật khẩu đã được gửi!");
      
      // Tự động chuyển đến trang reset password
      const url = new URL(data.resetLink);
      const token = url.searchParams.get('token');
      navigate(`/reset-password?token=${token}`);
    } catch (err) {
      if (err.response?.status === 404) {
        message.error("Không tìm thấy tài khoản với email này");
      } else if (err.response?.status === 400) {
        message.error("Email không hợp lệ");
      } else {
        message.error("Có lỗi xảy ra. Vui lòng thử lại sau");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Card title="Quên mật khẩu">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
            <Input placeholder="you@example.com" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Gửi yêu cầu
          </Button>
        </Form>
      </Card>
    </div>
  );
}
