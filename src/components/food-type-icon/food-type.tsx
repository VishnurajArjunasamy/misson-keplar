import React from "react";
import styles from "./food-type.module.scss";

interface TypeProp {
  type: string;
}
export default function FoodType({ type }: TypeProp) {
  return (
    <div
      className={type == "Veg" ? styles["veg-logo"] : styles["non-veg-logo"]}
    >
      <div className={styles["ciricle"]}></div>
    </div>
  );
}
