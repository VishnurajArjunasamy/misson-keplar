import React from "react";
import styles from "./price-card.module.scss";
import Button from "../button/button";
import { CartItemI } from "../../modals/cartModal";
import { CART, PRODUCTS } from "../../constants/app.constant";

interface PriceCardPropsI {
  cart: CartItemI[] | undefined;
}

export default function PriceCard({ cart }: PriceCardPropsI) {
  function getCartPriceTotal() {
    const totalPrice = cart?.reduce((acc, item) => {
      return acc + +item.price * item.quantity;
    }, 0);
    console.log(totalPrice);
    return totalPrice;
  }

  return (
    <div className={styles["price-container"]}>
      <div className={styles["price-info"]}>
        <p>{CART.TOTAL_AMOUNT}</p>
        <span>
          <i className={styles["currency-txt"]}>{PRODUCTS.CURRENCY_TYPE}</i>
          {getCartPriceTotal()}
        </span>
      </div>
      <Button name={"PLACE ORDER"} type="l" />
    </div>
  );
}
