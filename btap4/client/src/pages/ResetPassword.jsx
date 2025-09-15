import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, Form, Input, Button, message } from "antd";
import api from "../util/api";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");
  const [loading, setLoading] = useState(false);

  // Kiểm tra token có tồn tại không
  if (!token) {
    return (
      <div className="page">
        <Card title="Đặt lại mật khẩu">
          <div style={{ textAlign: 'center', color: '#ff4d4f' }}>
            <p>❌ Token không hợp lệ hoặc không tồn tại</p>
            <Button type="primary" onClick={() => navigate("/forgot-password")}>
              Quay lại trang quên mật khẩu
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await api.post("/api/reset-password", { token, password: values.password });
      message.success("Đổi mật khẩu thành công. Hãy đăng nhập lại.");
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 400) {
        message.error("Token không hợp lệ hoặc đã hết hạn");
      } else {
        message.error("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Card title="Đặt lại mật khẩu">
        <div style={{ marginBottom: '16px', padding: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px', fontSize: '12px' }}>
          Token: {token.substring(0, 20)}...
        </div>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item 
            label="Mật khẩu mới" 
            name="password" 
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu mới' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu mới" />
          </Form.Item>
          <Form.Item 
            label="Xác nhận mật khẩu" 
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu mới" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Đặt lại mật khẩu
          </Button>
        </Form>
      </Card>
    </div>
  );
}
