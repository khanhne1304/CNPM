import React, { ReactNode } from "react";

export type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ title, children, className }) => {
  return (
    <div
      className={className}
      style={{
        border: "1px solid #eee",
        borderRadius: 10,
        padding: 16,
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
        background: "#fff"
      }}
    >
      {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
      {children}
    </div>
  );
};
