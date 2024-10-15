import React from "react";
import styles from "./counter-btn.module.scss";

interface CounterBtnPropsI {
  quantity: number;
  handleCartIncrement: () => void;
  handleCartDecrement: () => void;
}

export default function CounterBtn({
  quantity,
  handleCartIncrement,
  handleCartDecrement,
}: CounterBtnPropsI) {
  return (
    <div className={styles["counter-btn"]}>
      <button onClick={handleCartDecrement}>&#x2012;</button>
      <span>{quantity}</span>
      <button onClick={handleCartIncrement}>+</button>
    </div>
  );
}
