import { useContext, useState } from "react";
import { Card, Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await login(values.email, values.password);
      message.success("Đăng nhập thành công");
      navigate("/");
    } catch (err) {
      message.error("Sai email hoặc mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Đặt return bên trong function component
  return (
    <div className="page">
      <Card title="Đăng nhập">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, min: 6 }]}
          >
            <Input.Password placeholder="••••••" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Đăng nhập
          </Button>

          {/* Thêm link Quên mật khẩu */}
          <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between" }}>
            <Link to="/forgot-password">Quên mật khẩu?</Link>
            <span>
              Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
            </span>
          </div>
        </Form>
      </Card>
    </div>
  );
}
