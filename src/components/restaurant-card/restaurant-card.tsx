import React from "react";
import { RestaurantIF } from "../../types/restaurantType";
import { Link } from "react-router-dom";
import Rating from "../rating/rating";
import certfiedImg from "../../assets/images/certify.png";
import vegIcon from "../../assets/images/veg-icon.png";
import nonVegIcon from "../../assets/images/non-veg-icon.png";
import styles from "./restaurant-card.module.scss";
import FoodType from "../food-type-icon/food-type";

interface PropsIF {
  data?: RestaurantIF;
}

export default function RestaurantCard({ data }: PropsIF) {
  return (
    <div className={styles["res-card"]}>
      <img src={data?.restaurantImageSrc} />
      <div className={styles["info"]}>
        <div className={styles["info-header"]}>
          <h1>{data?.name}</h1>
          <div className={styles["logos"]}>
            <i>
              <img src={certfiedImg} />
            </i>
            <>
              {data?.type.map((type) => (
                <i>
                  <img src={type == "Veg" ? vegIcon : nonVegIcon} />
                </i>
              ))}
            </>
          </div>
        </div>
        <div className={styles["info-content"]}>
          <div>
            <h2>{data?.location}</h2>
            <h3>{data?.timings}</h3>
          </div>
          <Rating />
        </div>
        <div className={styles["cuisine-txt"]}>{data?.cuisine.join(",")}</div>
        <Link to={`/restaurants/${data?.id}`} className={styles["link-txt"]}>
          <p>VIEW MORE DETAILS</p> <i>{">"}</i>
        </Link>
      </div>
    </div>
  );
}
