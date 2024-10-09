import React from "react";
import styles from "./dropdown.module.scss";

interface DropdownIF {
  label: string;
  value: string;
  errors?: object;
  options: string[] | undefined;
  name: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Dropdown({
  label,
  value,
  options,
  onChange,
  errors,
  name,
  required,
}: DropdownIF) {
  return (
    <label className={styles["drop-down"]}>
      <p className={styles["label"]}>{label}</p>
      <select
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        className={styles["select"]}
      >
        <>
          <option value="" disabled className={styles["options"]}>
            Select
          </option>
          {options?.map((option) => {
            return (
              <option value={option} key={option} className={styles["options"]}>
                {option}
              </option>
            );
          })}
        </>
      </select>
      {errors[name] && <p className={styles["error-txt"]}>{errors[name]}</p>}
    </label>
  );
}
