"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AddToCartButton: () => AddToCartButton,
  Button: () => Button,
  Card: () => Card,
  CartModalButton: () => CartModalButton,
  CartPanel: () => CartPanel,
  CartProvider: () => CartProvider,
  InputText: () => InputText,
  Modal: () => Modal,
  useCart: () => useCart
});
module.exports = __toCommonJS(index_exports);

// src/components/Button.tsx
var import_jsx_runtime = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var import_jsx_runtime2 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
var import_jsx_runtime3 = require("react/jsx-runtime");
var Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer
}) => {
  if (!isOpen) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: { padding: "12px 16px", borderBottom: "1px solid #eee", display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: title }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Button, { variant: "secondary", onClick: onClose, children: "\u0110\xF3ng" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { style: { padding: 16 }, children }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { style: { padding: 12, borderTop: "1px solid #eee", display: "flex", gap: 8, justifyContent: "flex-end" }, children: footer })
          ]
        }
      )
    }
  );
};

// src/components/Card.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var Card = ({ title, children, className }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
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
        title && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h3", { style: { marginTop: 0 }, children: title }),
        children
      ]
    }
  );
};

// src/cart/CartContext.tsx
var import_react = require("react");
var import_jsx_runtime5 = require("react/jsx-runtime");
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
var CartContext = (0, import_react.createContext)(null);
function CartProvider({
  children,
  persistKey
}) {
  const [state, dispatch] = (0, import_react.useReducer)(cartReducer, initialState, (init) => {
    if (typeof window !== "undefined" && persistKey) {
      try {
        const raw = window.localStorage.getItem(persistKey);
        if (raw) return JSON.parse(raw);
      } catch {
      }
    }
    return init;
  });
  const value = (0, import_react.useMemo)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(CartContext.Provider, { value, children });
}
function useCart() {
  const ctx = (0, import_react.useContext)(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}

// src/cart/CartUI.tsx
var import_react2 = __toESM(require("react"), 1);
var import_jsx_runtime6 = require("react/jsx-runtime");
function CartItemRow({ id, name, price, quantity, image }) {
  const { update, remove } = useCart();
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "56px 1fr auto auto", gap: 12, alignItems: "center" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("img", { src: image || "https://via.placeholder.com/56", alt: name, width: 56, height: 56, style: { borderRadius: 6, objectFit: "cover" } }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: { fontWeight: 600 }, children: name }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("small", { children: [
        price.toLocaleString(),
        " \u0111"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: { width: 100 }, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: { justifySelf: "end" }, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { variant: "danger", onClick: () => remove(id), children: "Xo\xE1" }) })
  ] });
}
function CartPanel() {
  const { state, subtotal, totalItems, clear } = useCart();
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Card, { title: "Gi\u1ECF h\xE0ng", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
      state.items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { children: "Ch\u01B0a c\xF3 s\u1EA3n ph\u1EA9m n\xE0o." }),
      state.items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(CartItemRow, { id: i.id, name: i.name, price: i.price, quantity: i.quantity, image: i.image }, i.id))
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("hr", { style: { margin: "16px 0" } }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", fontWeight: 600 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "T\u1ED5ng s\u1ED1 l\u01B0\u1EE3ng:" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: totalItems })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 18 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "T\u1EA1m t\xEDnh:" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { children: [
        subtotal.toLocaleString(),
        " \u0111"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { style: { display: "flex", gap: 8, marginTop: 12 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { variant: "secondary", onClick: clear, children: "L\xE0m tr\u1ED1ng" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { children: "Thanh to\xE1n" })
    ] })
  ] });
}
function CartModalButton() {
  const [open, setOpen] = import_react2.default.useState(false);
  const { totalItems } = useCart();
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Button, { onClick: () => setOpen(true), children: [
      "\u{1F6D2} Gi\u1ECF h\xE0ng (",
      totalItems,
      ")"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Modal, { isOpen: open, onClose: () => setOpen(false), title: "Gi\u1ECF h\xE0ng", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(CartPanel, {}) })
  ] });
}
function AddToCartButton({ id, name, price, image }) {
  const { add } = useCart();
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { onClick: () => add({ id, name, price, quantity: 1, image }), children: "Th\xEAm v\xE0o gi\u1ECF" });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AddToCartButton,
  Button,
  Card,
  CartModalButton,
  CartPanel,
  CartProvider,
  InputText,
  Modal,
  useCart
});
//# sourceMappingURL=index.cjs.map