import React from "react";
import styles from "./number-input.module.scss";

interface NumberInputIF extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: number;
  handleNumberIncrement: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleNumberDecrement: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function NumberInput({
  label,
  value,
  onChange,
  handleNumberIncrement,
  handleNumberDecrement,
}: NumberInputIF) {
  return (
    <label className={styles["number-input"]}>
      <p>{label}</p>
      <div>
        <button type="button" onClick={handleNumberIncrement}>
          +
        </button>
        <input type="number" value={value} onChange={onChange} />
        <button type="button" onClick={handleNumberDecrement}>
          -
        </button>
      </div>
    </label>
  );
}
