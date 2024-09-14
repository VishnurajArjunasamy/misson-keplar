import React from "react";

export default function Input({ type, onClick, value }) {
  return <input className="w-full h-full" type={type} value={value} onClick={onClick} />;
}
