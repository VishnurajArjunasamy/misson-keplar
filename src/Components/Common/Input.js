import React from "react";

export default function Input({ className,type, onClick, value,placeholder }) {
  return <input className={className} type={type} value={value} onClick={onClick} placeholder={placeholder}/>;
}
