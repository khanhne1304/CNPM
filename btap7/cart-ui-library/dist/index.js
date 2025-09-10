// src/components/Button.tsx
import { jsx } from "react/jsx-runtime";
var Button = ({
  children,
  onClick,
  disabled,
  variant = "primary",
  className,
  type = "button"
}) => {
  const bg = variant === "primary" ? "#0070f3" : variant === "secondary" ? "#eaeaea" : "#ff4d4f";
  const color = variant === "secondary" ? "#000" : "#fff";
  return /* @__PURE__ */ jsx(
    "button",
    {
      type,
      onClick,
      disabled,
      className,
      style: {
        padding: "8px 16px",
        borderRadius: 8,
        background: disabled ? "#c0c0c0" : bg,
        color,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: 600
      },
      children
    }
  );
};

// src/components/InputText.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var InputText = ({
  value,
  onChange,
  placeholder,
  className,
  type = "text",
  min,
  max
}) => {
  const handle = (e) => onChange(e.target.value);
  return /* @__PURE__ */ jsx2(
    "input",
    {
      value,
      onChange: handle,
      placeholder,
      type,
      min,
      max,
      className,
      style: {
        padding: "8px 10px",
        border: "1px solid #d0d0d0",
        borderRadius: 6,
        width: "100%"
      }
    }
  );
};

// src/components/Modal.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
var Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer
}) => {
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx3(
    "div",
    {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999
      },
      role: "dialog",
      "aria-modal": "true",
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          style: {
            width: "min(92vw, 640px)",
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 8px 34px rgba(0,0,0,0.15)",
            overflow: "hidden"
          },
          children: [
            /* @__PURE__ */ jsxs("div", { style: { padding: "12px 16px", borderBottom: "1px solid #eee", display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
              /* @__PURE__ */ jsx3("strong", { children: title }),
              /* @__PURE__ */ jsx3(Button, { variant: "secondary", onClick: onClose, children: "\u0110\xF3ng" })
            ] }),
            /* @__PURE__ */ jsx3("div", { style: { padding: 16 }, children }),
            /* @__PURE__ */ jsx3("div", { style: { padding: 12, borderTop: "1px solid #eee", display: "flex", gap: 8, justifyContent: "flex-end" }, children: footer })
          ]
        }
      )
    }
  );
};

// src/components/Card.tsx
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var Card = ({ title, children, className }) => {
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className,
      style: {
        border: "1px solid #eee",
        borderRadius: 10,
        padding: 16,
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
        background: "#fff"
      },
      children: [
        title && /* @__PURE__ */ jsx4("h3", { style: { marginTop: 0 }, children: title }),
        children
      ]
    }
  );
};

// src/cart/CartContext.tsx
import { createContext, useContext, useReducer, useMemo } from "react";
import { jsx as jsx5 } from "react/jsx-runtime";
var initialState = { items: [] };
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const exists = state.items.find((i) => i.id === action.item.id);
      if (exists) {
        return {
          items: state.items.map(
            (i) => i.id === action.item.id ? { ...i, quantity: i.quantity + action.item.quantity } : i
          )
        };
      }
      return { items: [...state.items, action.item] };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "UPDATE":
      return {
        items: state.items.map(
          (i) => i.id === action.id ? { ...i, quantity: Math.max(0, action.quantity) } : i
        ).filter((i) => i.quantity > 0)
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}
var CartContext = createContext(null);
function CartProvider({
  children,
  persistKey
}) {
  const [state, dispatch] = useReducer(cartReducer, initialState, (init) => {
    if (typeof window !== "undefined" && persistKey) {
      try {
        const raw = window.localStorage.getItem(persistKey);
        if (raw) return JSON.parse(raw);
      } catch {
      }
    }
    return init;
  });
  const value = useMemo(() => {
    const add = (item) => dispatch({ type: "ADD", item });
    const remove = (id) => dispatch({ type: "REMOVE", id });
    const update = (id, quantity) => dispatch({ type: "UPDATE", id, quantity });
    const clear = () => dispatch({ type: "CLEAR" });
    const totalItems = state.items.reduce(
      (s, i) => s + i.quantity,
      0
    );
    const subtotal = state.items.reduce(
      (s, i) => s + i.quantity * i.price,
      0
    );
    return { state, add, remove, update, clear, totalItems, subtotal };
  }, [state]);
  if (typeof window !== "undefined" && persistKey) {
    try {
      window.localStorage.setItem(persistKey, JSON.stringify(state));
    } catch {
    }
  }
  return /* @__PURE__ */ jsx5(CartContext.Provider, { value, children });
}
function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}

// src/cart/CartUI.tsx
import React2 from "react";
import { Fragment, jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
function CartItemRow({ id, name, price, quantity, image }) {
  const { update, remove } = useCart();
  return /* @__PURE__ */ jsxs3("div", { style: { display: "grid", gridTemplateColumns: "56px 1fr auto auto", gap: 12, alignItems: "center" }, children: [
    /* @__PURE__ */ jsx6("img", { src: image || "https://via.placeholder.com/56", alt: name, width: 56, height: 56, style: { borderRadius: 6, objectFit: "cover" } }),
    /* @__PURE__ */ jsxs3("div", { children: [
      /* @__PURE__ */ jsx6("div", { style: { fontWeight: 600 }, children: name }),
      /* @__PURE__ */ jsxs3("small", { children: [
        price.toLocaleString(),
        " \u0111"
      ] })
    ] }),
    /* @__PURE__ */ jsx6("div", { style: { width: 100 }, children: /* @__PURE__ */ jsx6(
      InputText,
      {
        type: "number",
        value: quantity,
        min: 0,
        onChange: (val) => {
          const q = Number(val || 0);
          update(id, Number.isFinite(q) ? q : 0);
        }
      }
    ) }),
    /* @__PURE__ */ jsx6("div", { style: { justifySelf: "end" }, children: /* @__PURE__ */ jsx6(Button, { variant: "danger", onClick: () => remove(id), children: "Xo\xE1" }) })
  ] });
}
function CartPanel() {
  const { state, subtotal, totalItems, clear } = useCart();
  return /* @__PURE__ */ jsxs3(Card, { title: "Gi\u1ECF h\xE0ng", children: [
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
      state.items.length === 0 && /* @__PURE__ */ jsx6("div", { children: "Ch\u01B0a c\xF3 s\u1EA3n ph\u1EA9m n\xE0o." }),
      state.items.map((i) => /* @__PURE__ */ jsx6(CartItemRow, { id: i.id, name: i.name, price: i.price, quantity: i.quantity, image: i.image }, i.id))
    ] }),
    /* @__PURE__ */ jsx6("hr", { style: { margin: "16px 0" } }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", justifyContent: "space-between", fontWeight: 600 }, children: [
      /* @__PURE__ */ jsx6("span", { children: "T\u1ED5ng s\u1ED1 l\u01B0\u1EE3ng:" }),
      /* @__PURE__ */ jsx6("span", { children: totalItems })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 18 }, children: [
      /* @__PURE__ */ jsx6("span", { children: "T\u1EA1m t\xEDnh:" }),
      /* @__PURE__ */ jsxs3("span", { children: [
        subtotal.toLocaleString(),
        " \u0111"
      ] })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", gap: 8, marginTop: 12 }, children: [
      /* @__PURE__ */ jsx6(Button, { variant: "secondary", onClick: clear, children: "L\xE0m tr\u1ED1ng" }),
      /* @__PURE__ */ jsx6(Button, { children: "Thanh to\xE1n" })
    ] })
  ] });
}
function CartModalButton() {
  const [open, setOpen] = React2.useState(false);
  const { totalItems } = useCart();
  return /* @__PURE__ */ jsxs3(Fragment, { children: [
    /* @__PURE__ */ jsxs3(Button, { onClick: () => setOpen(true), children: [
      "\u{1F6D2} Gi\u1ECF h\xE0ng (",
      totalItems,
      ")"
    ] }),
    /* @__PURE__ */ jsx6(Modal, { isOpen: open, onClose: () => setOpen(false), title: "Gi\u1ECF h\xE0ng", children: /* @__PURE__ */ jsx6(CartPanel, {}) })
  ] });
}
function AddToCartButton({ id, name, price, image }) {
  const { add } = useCart();
  return /* @__PURE__ */ jsx6(Button, { onClick: () => add({ id, name, price, quantity: 1, image }), children: "Th\xEAm v\xE0o gi\u1ECF" });
}
export {
  AddToCartButton,
  Button,
  Card,
  CartModalButton,
  CartPanel,
  CartProvider,
  InputText,
  Modal,
  useCart
};
//# sourceMappingURL=index.js.map