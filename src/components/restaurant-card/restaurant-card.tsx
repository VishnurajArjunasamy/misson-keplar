import React from "react";
import styles from "./restaurant-card.module.scss";
import { RestaurantIF } from "../../types/restaurantType";
import Rating from "../rating/rating";
import { Link } from "react-router-dom";

interface PropsIF {
  data?: RestaurantIF;
}

export default function RestaurantCard({ data }: PropsIF) {
  return (
    <div className={styles["res-card"]}>
      <img src={data?.restaurantImageSrc} />
      <div className={styles["info"]}>
        <h1>{data?.name}</h1>
        <div>
          <div>
            <h2>{data?.location}</h2>
            <h3>{data?.timings}</h3>
          </div>
          <Rating />
        </div>
        <div>{data?.cuisine.join(",")}</div>
        <Link to={`/restaurants/:${data?.id}`} state={data}>VIEW MORE DETAILS</Link>
      </div>
    </div>
  );
}
