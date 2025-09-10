export type CartItem = {
  id: string;
  name: string;
  price: number;        // đơn giá
  quantity: number;     // số lượng
  image?: string;
  sku?: string;
  meta?: Record<string, unknown>;
};

export type CartState = {
  items: CartItem[];
};

export type CartAction =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; id: string }
  | { type: "UPDATE"; id: string; quantity: number }
  | { type: "CLEAR" };
