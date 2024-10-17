import React from "react";
import styles from "./order-confirm.module.scss";
import CategoryContainer from "../../containers/category-container/category-container";
import Footer from "../../components/footer/footer";
import OrderItemsContainer from "../../containers/order-items-container/order-items-container";
import Quotes from "../../components/quotes/quotes";

export default function OrderConfirm() {
  return (
    <div className={styles["order-confrim-page"]}>
      <OrderItemsContainer />
      <div className={styles['home-page-elements']}>
        <Quotes />
        <CategoryContainer />
        <Footer />
      </div>
    </div>
  );
}
