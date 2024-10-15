import React from "react";
import styles from "./counter-btn.module.scss";

export default function CounterBtn() {
  return (
    <div className={styles["counter-btn"]}>
      <button></button>
      <span></span>
      <button></button>
    </div>
  );
}
