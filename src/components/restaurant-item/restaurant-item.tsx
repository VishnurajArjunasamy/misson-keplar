import React from "react";
import styles from "./restaurant-item.module.scss";
import { useLocation, useParams } from "react-router-dom";

export default function RestaurantItem() {
  const { id } = useParams();
  const { state } = useLocation();
  console.log(state);
  return <div className={styles["items"]}>RestaurantItem {id}</div>;
}
