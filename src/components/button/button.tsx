import React from "react";
import styles from "./button.module.scss";

interface ButtonPropsI {
  type: "l" | "sm";
  name: string;
}

export default function Button({ name, type = "l" }: ButtonPropsI) {
  const btnStyle = type == "l" ? styles["large-btn"] : styles["small-btn"];
  return (
    <button className={`${styles["styled-button"]} ${btnStyle}`}>{name}</button>
  );
}
