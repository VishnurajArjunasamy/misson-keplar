import React from "react";
import styles from "./input.module.scss";

interface InputIF extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errors?: object;
}

export default function Input({
  label,
  type,
  name,
  onFocus,
  onBlur,
  errors,
}: InputIF) {
  return (
    <label className={styles["input-card"]}>
      <p>{label}</p>
      <input
        type={type}
        name={name}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {errors[name] && <p className={styles["error-txt"]}>{errors[name]}</p>}
    </label>
  );
}
