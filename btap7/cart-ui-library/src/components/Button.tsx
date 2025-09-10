import React, { ReactNode } from "react";

export type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
  type?: "button" | "submit" | "reset";
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  variant = "primary",
  className,
  type = "button",
}) => {
  const bg =
    variant === "primary"
      ? "#0070f3"
      : variant === "secondary"
      ? "#eaeaea"
      : "#ff4d4f";
  const color = variant === "secondary" ? "#000" : "#fff";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        padding: "8px 16px",
        borderRadius: 8,
        background: disabled ? "#c0c0c0" : bg,
        color,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: 600
      }}
    >
      {children}
    </button>
  );
};
