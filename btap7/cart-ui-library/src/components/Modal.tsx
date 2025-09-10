import React, { ReactNode } from "react";
import { Button } from "./Button";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 9999
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          width: "min(92vw, 640px)",
          background: "#fff",
          borderRadius: 10,
          boxShadow: "0 8px 34px rgba(0,0,0,0.15)",
          overflow: "hidden"
        }}
      >
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #eee", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <strong>{title}</strong>
          <Button variant="secondary" onClick={onClose}>Đóng</Button>
        </div>

        <div style={{ padding: 16 }}>{children}</div>

        <div style={{ padding: 12, borderTop: "1px solid #eee", display: "flex", gap: 8, justifyContent: "flex-end" }}>
          {footer}
        </div>
      </div>
    </div>
  );
};
