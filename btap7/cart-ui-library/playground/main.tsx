import React from "react";
import ReactDOM from "react-dom/client";

// Import trực tiếp từ src để dev (khi dùng thật: import từ package đã publish)
import { CartProvider, CartPanel, CartModalButton, AddToCartButton, Card } from "../src";

function App() {
  return (
    <CartProvider persistKey="demo-cart">
      <div style={{ maxWidth: 900, margin: "40px auto", display: "grid", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <CartModalButton />
        </div>

        <Card title="Sản phẩm">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
            {[
              { id: "p1", name: "Áo thể thao", price: 199000, image: "https://picsum.photos/seed/a/200" },
              { id: "p2", name: "Giày chạy bộ", price: 899000, image: "https://picsum.photos/seed/b/200" },
              { id: "p3", name: "Bình nước", price: 129000, image: "https://picsum.photos/seed/c/200" },
            ].map(p => (
              <Card key={p.id} title={p.name}>
                <img src={p.image} width={200} height={200} style={{ borderRadius: 8, objectFit: "cover" }} />
                <div style={{ margin: "8px 0", fontWeight: 600 }}>{p.price.toLocaleString()} đ</div>
                <AddToCartButton {...p} />
              </Card>
            ))}
          </div>
        </Card>

        <CartPanel />
      </div>
    </CartProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
