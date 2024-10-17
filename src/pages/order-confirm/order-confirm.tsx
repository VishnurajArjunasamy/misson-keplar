import React from "react";
import styles from "./order-confirm.module.scss";
import CategoryContainer from "../../containers/category-container/category-container";
import Footer from "../../components/footer/footer";
import OrderItemsContainer from "../../containers/order-items-container/order-items-container";

export default function OrderConfirm() {
  return (
    <div className={styles["order-confrim-page"]}>
      <OrderItemsContainer />
      <CategoryContainer />
      <Footer />
    </div>
  );
}
