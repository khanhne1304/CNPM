import { Layout as AntLayout, Menu, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const { Header, Content } = AntLayout;

export default function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", justifyContent: "space-between" }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["home"]}>
          <Menu.Item key="home"><Link to="/">Trang chủ</Link></Menu.Item>
        </Menu>
        {user ? (
          <Button onClick={() => { logout(); navigate("/login"); }}>Đăng xuất</Button>
        ) : (
          <div>
            <Link to="/login" style={{ marginRight: 8 }}>Đăng nhập</Link>
            <Link to="/register">Đăng ký</Link>
          </div>
        )}
      </Header>
      <Content style={{ padding: 24 }}>{children}</Content>
    </AntLayout>
  );
}
