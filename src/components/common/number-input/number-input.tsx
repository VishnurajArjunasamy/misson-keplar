import React from "react";
import styles from "./number-input.module.scss";

interface NumberInputIF extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: number;
  required?: boolean;
  handleNumberIncrement: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleNumberDecrement: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function NumberInput({
  label,
  value,
  onChange,
  required,
  name,
  handleNumberIncrement,
  handleNumberDecrement,
}: NumberInputIF) {
  return (
    <label className={styles["number-input"]}>
      <p>{label}</p>
      <div className={styles["align"]}>
        <button type="button" onClick={handleNumberDecrement}>
          -
        </button>
        <input
          type="number"
          name={name}
          value={value == 0 ? "" : value}
          required={required}
          onChange={onChange}
        />
        <button type="button" onClick={handleNumberIncrement}>
          +
        </button>
      </div>
    </label>
  );
}
