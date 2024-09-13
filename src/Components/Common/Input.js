import React from "react";

export default function Input({ type, onClick, value }) {
  return <input type={type} value={value} onClick={onClick} />;
}
