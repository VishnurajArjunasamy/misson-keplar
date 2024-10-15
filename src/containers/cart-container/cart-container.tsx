import React, { useState } from "react";
import styles from "./cart-container.module.scss";
import PriceCard from "../../components/price-card/price-card";
import CartSection from "../../components/cart-section/cart-section";
import { CartItemI } from "../../modals/cartModal";

interface CartContainerPropsI {
  cart: CartItemI[];
}

export default function CartContainer({ cart }: CartContainerPropsI) {
  return (
    <section className={styles["cart-container"]}>
      <CartSection cart={cart} />
    </section>
  );
}
