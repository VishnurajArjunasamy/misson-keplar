import React from "react";
import styles from "./dropdown.module.scss";

// interface optionIF {
//   label: string;
//   value: string;
// }

interface DropdownIF {
  label: string;
  value: string;
  options: string[] | undefined;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Dropdown({
  label,
  value,
  options,
  onChange,
}: DropdownIF) {
  return (
    <label className={styles["drop-down"]}>
      <p className={styles["label"]}>{label}</p>
      <select value={value} onChange={onChange} className={styles["select"]}>
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
    </label>
  );
}
