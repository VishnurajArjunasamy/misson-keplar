import React from "react";
import styles from "./checkbox.module.scss";

interface CheckboxIF {
  label: string;
  preference: {
    veg: boolean;
    nonVeg: boolean;
  };
  name: string;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => void;
}

const foodTypes = [
  {
    name: "Veg",
    id: "veg",
  },
  {
    name: "Non Veg",
    id: "nonVeg",
  },
];

export default function Checkbox({
  label,
  preference,
  name,
  handleChange,
}: CheckboxIF) {
  return (
    <div className={styles["checkbox"]}>
      <p>{label}</p>
      <div className={styles["align"]}>
        {foodTypes.map((fType) => {
          return (
            <label key={fType.id}>
              <input
                type="checkbox"
                name={fType.id}
                // checked={preference[fType.id]}
                // onChange={(e) => handleChange(e, fType.id)}
              />
              {fType.name}
            </label>
          );
        })}
      </div>
    </div>
  );
}
