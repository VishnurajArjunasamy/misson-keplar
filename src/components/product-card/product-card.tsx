import React from "react";
import { ProductI } from "../../modals/productModal";
import styles from "./product-card.module.scss";
import Guarantee from "../guarantee/guarantee";
import { PRODUCTS } from "../../constants/app.constant";
import Button from "../button/button";

interface ProductCardPropsI {
  productData: ProductI;
}

export default function ProductCard({ productData }: ProductCardPropsI) {
  return (
    <div className={styles["product-card"]}>
      <img src={productData.photo} alt={productData.name} />
      <div className={styles["split-container"]}>
        <h2>{productData.name}</h2>
        <span>
          <i className={styles["currency-txt"]}>{PRODUCTS.CURRENCY_TYPE}</i>
          {productData.price}
        </span>
      </div>
      <p>{productData.description}</p>
      <Guarantee years={productData.guarantee} />
      <div className={styles["line"]}></div>
      <div className={styles["btns-container"]}>
        <Button type="no-bg" name={PRODUCTS.ADD_TO_WISHLIST} />
        <Button type="l" name={PRODUCTS.ADD_TO_CART} />
      </div>
    </div>
  );
}
