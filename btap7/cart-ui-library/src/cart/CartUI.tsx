import React from "react";
import { useCart } from "./CartContext";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { InputText } from "../components/InputText";
import { Modal } from "../components/Modal";

export function CartItemRow({ id, name, price, quantity, image }: {
  id: string; name: string; price: number; quantity: number; image?: string;
}) {
  const { update, remove } = useCart();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "56px 1fr auto auto", gap: 12, alignItems: "center" }}>
      <img src={image || "https://via.placeholder.com/56"} alt={name} width={56} height={56} style={{ borderRadius: 6, objectFit: "cover" }} />
      <div>
        <div style={{ fontWeight: 600 }}>{name}</div>
        <small>{price.toLocaleString()} đ</small>
      </div>
      <div style={{ width: 100 }}>
        <InputText
          type="number"
          value={quantity}
          min={0}
          onChange={(val) => {
            const q = Number(val || 0);
            update(id, Number.isFinite(q) ? q : 0);
          }}
        />
      </div>
      <div style={{ justifySelf: "end" }}>
        <Button variant="danger" onClick={() => remove(id)}>Xoá</Button>
      </div>
    </div>
  );
}

export function CartPanel() {
  const { state, subtotal, totalItems, clear } = useCart();
  return (
    <Card title="Giỏ hàng">
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {state.items.length === 0 && <div>Chưa có sản phẩm nào.</div>}
        {state.items.map(i => (
          <CartItemRow key={i.id} id={i.id} name={i.name} price={i.price} quantity={i.quantity} image={i.image} />
        ))}
      </div>

      <hr style={{ margin: "16px 0" }} />

      <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
        <span>Tổng số lượng:</span>
        <span>{totalItems}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 18 }}>
        <span>Tạm tính:</span>
        <span>{subtotal.toLocaleString()} đ</span>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <Button variant="secondary" onClick={clear}>Làm trống</Button>
        <Button>Thanh toán</Button>
      </div>
    </Card>
  );
}

export function CartModalButton() {
  const [open, setOpen] = React.useState(false);
  const { totalItems } = useCart();
  return (
    <>
      <Button onClick={() => setOpen(true)}>🛒 Giỏ hàng ({totalItems})</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Giỏ hàng">
        <CartPanel />
      </Modal>
    </>
  );
}

export function AddToCartButton({ id, name, price, image }: { id: string; name: string; price: number; image?: string; }) {
  const { add } = useCart();
  return (
    <Button onClick={() => add({ id, name, price, quantity: 1, image })}>
      Thêm vào giỏ
    </Button>
  );
}
