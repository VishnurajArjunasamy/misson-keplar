import React, { useState } from "react";
import styles from "./number-input.module.scss";

interface NumberInputIF extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: number;
  errors?: object;
  required?: boolean;
  handleNumberIncrement: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleNumberDecrement: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function NumberInput({
  label,
  value,
  onChange,
  errors,
  required,
  name,
  handleNumberIncrement,
  handleNumberDecrement,
}: NumberInputIF) {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <label className={styles["number-input"]}>
      <p>{label}</p>

      <div className={styles["align"]}>
        {isFocus && (
          <button type="button" onClick={handleNumberDecrement}>
            -
          </button>
        )}

        <input
          type="number"
          name={name}
          onFocus={() => setIsFocus(true)}
          value={value == 0 ? "" : value}
          required={required}
          onChange={onChange}
        />
        {isFocus && (
          <button type="button" onClick={handleNumberIncrement}>
            +
          </button>
        )}
      </div>
      {errors[name] && <p className={styles["error-txt"]}>{errors[name]}</p>}
    </label>
  );
}
