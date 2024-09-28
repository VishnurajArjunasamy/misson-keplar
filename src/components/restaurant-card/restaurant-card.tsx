import React from "react";
import styles from "./restaurant-card.module.scss";
import { RestaurantIF } from "../../types/restaurantType";

interface PropsIF {
  data?: RestaurantIF;
}

export default function RestaurantCard({ data }: PropsIF) {
  return (
    <div className={styles["res-card"]}>
      <img src={data?.restaurantImageSrc} />
      <div className={styles["info"]}></div>
    </div>
  );
}
