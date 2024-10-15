import React from "react";
import styles from "./cart-item.module.scss";
import { CartItemI } from "../../modals/cartModal";

interface CartItemCardPropsI {
  data: CartItemI;
  type: string;
}

export default function CartItemCard({ data, type }: CartItemCardPropsI) {
  return (
    <div className={styles["cart-item-card"]}>
      <img />
      <div className={styles["info-container"]}>
        <h2></h2>
        <span></span>
      </div>
      <div>
    
      </div>
    </div>
  );
}
