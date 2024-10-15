import React, { useState } from "react";
import styles from "./cart-section.module.scss";
import PriceCard from "../price-card/price-card";

export default function CartSection() {
  const [activeTab, setActiveTab] = useState("myCart");
  const cart = ["cart 1", "cart 2"];
  const wishList = ["wish 1", "wish 2"];
  const items = activeTab == "myCart" ? cart : wishList;
  return (
    <div className={styles["cart-section"]}>
      <ul className={styles["cart-tab"]}>
        <li onClick={() => setActiveTab("myCart")}>MY CART</li>
        <li onClick={() => setActiveTab("myWishList")}>MY WISHLIST</li>
      </ul>
      <div className={styles["cart-items-container"]}>{items}</div>
      {
        <div className={styles["price-section"]}>
          <PriceCard />
        </div>
      }
    </div>
  );
}
