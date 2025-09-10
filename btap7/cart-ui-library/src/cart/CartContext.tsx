import React, { createContext, useContext, useReducer, ReactNode, useMemo } from "react";
import type { CartAction, CartItem, CartState } from "./types";

const initialState: CartState = { items: [] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const exists = state.items.find((i: CartItem) => i.id === action.item.id);
      if (exists) {
        return {
          items: state.items.map((i: CartItem) =>
            i.id === action.item.id
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case "REMOVE":
      return { items: state.items.filter((i: CartItem) => i.id !== action.id) };
    case "UPDATE":
      return {
        items: state.items
          .map((i: CartItem) =>
            i.id === action.id ? { ...i, quantity: Math.max(0, action.quantity) } : i
          )
          .filter((i: CartItem) => i.quantity > 0),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  state: CartState;
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  update: (id: string, quantity: number) => void;
  clear: () => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  children,
  persistKey,
}: {
  children: ReactNode;
  persistKey?: string;
}) {
  const [state, dispatch] = useReducer(cartReducer, initialState, (init: CartState) => {
    if (typeof window !== "undefined" && persistKey) {
      try {
        const raw = window.localStorage.getItem(persistKey);
        if (raw) return JSON.parse(raw) as CartState;
      } catch {
        // ignore
      }
    }
    return init;
  });

  const value = useMemo<CartContextValue>(() => {
    const add = (item: CartItem) => dispatch({ type: "ADD", item });
    const remove = (id: string) => dispatch({ type: "REMOVE", id });
    const update = (id: string, quantity: number) =>
      dispatch({ type: "UPDATE", id, quantity });
    const clear = () => dispatch({ type: "CLEAR" });

    const totalItems = state.items.reduce(
      (s: number, i: CartItem) => s + i.quantity,
      0
    );
    const subtotal = state.items.reduce(
      (s: number, i: CartItem) => s + i.quantity * i.price,
      0
    );

    return { state, add, remove, update, clear, totalItems, subtotal };
  }, [state]);

  // persist
  if (typeof window !== "undefined" && persistKey) {
    try {
      window.localStorage.setItem(persistKey, JSON.stringify(state));
    } catch {
      // ignore
    }
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
