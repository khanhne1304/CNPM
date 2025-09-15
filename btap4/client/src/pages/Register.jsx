import { useContext, useState } from "react";
import { Card, Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/AuthContext";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await register(values.name, values.email, values.password);
      message.success("Đăng ký thành công, vui lòng đăng nhập");
      navigate("/login");
    } catch {
      message.error("Không thể đăng ký");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Card title="Đăng ký">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Họ tên" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, min: 6 }]}>
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>Đăng ký</Button>
          <div style={{ marginTop: 12 }}>
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
