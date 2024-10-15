import React from "react";
import styles from "./price-card.module.scss";
import Button from "../button/button";

export default function PriceCard() {
  return (
    <div className={styles["price-container"]}>
      <div className={styles["price-info"]}>
        <p>Total Amount</p>
        <span>Amount</span>
      </div>
      <Button name={"PLACE ORDER"} type="l" />
    </div>
  );
}
