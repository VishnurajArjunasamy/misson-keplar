import React from "react";
import styles from "./price-card.module.scss";
import Button from "../button/button";
import { CartItemI } from "../../modals/cartModal";

interface PriceCardPropsI {
  cart: CartItemI[] | undefined;
}

export default function PriceCard({ cart }: PriceCardPropsI) {
  function getCartPriceTotal() {
    // const totalPrice = cart?.reduce((acc, item) => {
    //   //   console.log(item);
    //   return "";
    // }, 0);
    // return totalPrice;
    console.log(cart);
  }
  getCartPriceTotal();
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
