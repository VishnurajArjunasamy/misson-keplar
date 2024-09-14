import React from "react";

export default function Input({
  className,
  type,
  onKeyDown,
  value,
  placeholder,
}) {
  return (
    <input
      className={className}
      type={type}
      value={value}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
    />
  );
}
