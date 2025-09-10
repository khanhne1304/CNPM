import React, { ChangeEvent } from "react";

export type InputTextProps = {
  value: string | number;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  type?: "text" | "number";
  min?: number;
  max?: number;
};

export const InputText: React.FC<InputTextProps> = ({
  value,
  onChange,
  placeholder,
  className,
  type = "text",
  min,
  max,
}) => {
  const handle = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);
  return (
    <input
      value={value}
      onChange={handle}
      placeholder={placeholder}
      type={type}
      min={min}
      max={max}
      className={className}
      style={{
        padding: "8px 10px",
        border: "1px solid #d0d0d0",
        borderRadius: 6,
        width: "100%"
      }}
    />
  );
};
