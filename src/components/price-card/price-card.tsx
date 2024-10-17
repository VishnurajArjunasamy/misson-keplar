import React from "react";
import styles from "./price-card.module.scss";
import Button from "../button/button";
import { CartItemI } from "../../modals/cartModal";
import { CART, PRODUCTS } from "../../constants/app.constant";
import { useNavigate } from "react-router-dom";

interface PriceCardPropsI {
  cart: CartItemI[] | undefined;
}

export default function PriceCard({ cart }: PriceCardPropsI) {
  const navigate = useNavigate();

  //Get total price of all the items times their quantity
  function getCartPriceTotal() {
    const totalPrice = cart?.reduce((acc, item) => {
      return acc + +item.price * item.quantity;
    }, 0);
    return totalPrice?.toLocaleString("en-IN");
  }

  //handle place order button click
  function handlePlaceOrder() {
    navigate("/confirmOrder", { state: cart });
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
      <Button name={"PLACE ORDER"} type="l" onClick={handlePlaceOrder} />
    </div>
  );
}
