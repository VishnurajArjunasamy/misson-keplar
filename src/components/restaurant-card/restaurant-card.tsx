import React from "react";
import { RestaurantIF } from "../../types/restaurantType";
import { Link } from "react-router-dom";
import Rating from "../rating/rating";
import certfiedImg from "../../assets/images/certify.png";
import styles from "./restaurant-card.module.scss";
import FoodType from "../food-type-icon/food-type";
import rightArrow from "../../assets/images/arrow-right.png";

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
                <i key={type}>
                  <FoodType type={type} />
                </i>
              ))}
            </>
          </div>
        </div>
        <div className={styles["info-content"]}>
          <div className={styles["info-section"]}>
            <h2>{data?.location}</h2>
            <h3>{data?.timings}</h3>
          </div>
          <Rating rating={data?.rating} />
        </div>
        <div className={styles["cuisine-txt"]}>{data?.cuisine.join(",")}</div>
        <Link to={`/restaurants/${data?.id}`} className={styles["link-txt"]}>
          <p>VIEW MORE DETAILS</p>
          <i className={styles['right-arrow']}>
            <img src={rightArrow} />
          </i>
        </Link>
      </div>
    </div>
  );
}
