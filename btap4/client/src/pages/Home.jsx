import { useEffect, useState } from "react";
import { Card } from "antd";
import api from "../util/api";

export default function Home() {
  const [message, setMessage] = useState("Đang tải...");

  useEffect(() => {
    api.get("/api/home")
      .then((res) => setMessage(res.data.message))
      .catch(() => setMessage("Hãy đăng nhập để xem nội dung."));
  }, []);

  return (
    <div className="page">
      <Card title="Trang chủ">
        <p>{message}</p>
      </Card>
    </div>
  );
}
