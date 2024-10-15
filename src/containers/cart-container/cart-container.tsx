import React, { useState } from "react";
import styles from "./cart-container.module.scss";
import PriceCard from "../../components/price-card/price-card";
import CartSection from "../../components/cart-section/cart-section";

export default function CartContainer() {
  return (
    <section className={styles["cart-container"]}>
      <CartSection />
    </section>
  );
}
