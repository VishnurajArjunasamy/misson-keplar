import React, { useEffect, useState } from "react";
import styles from "./restaurant-item.module.scss";
import { useLocation, useParams } from "react-router-dom";
import { getRestaurants } from "../../services/restaurantService";
import { RestaurantIF } from "../../types/restaurantType";
import { getRestaurant } from "../../utils/commonUtils";

export default function RestaurantItem() {
  const [resData, setResData] = useState<RestaurantIF[] | undefined>(undefined);
  const { id } = useParams();
  const { state } = useLocation();
  let resItems, resName;
  if (id && resData) {
    const restaurant = getRestaurant(+id, resData);
    resName = restaurant?.name;
    resItems = restaurant?.items;
  }
  console.log("from outside");
  console.log(resData);

  useEffect(() => {
    async function fetchData() {
      const result = await getRestaurants();
      setResData(result);
      console.log("from useEffect");
    }
    if (state) {
      setResData(state);
    } else {
      fetchData();
    }
  }, [state]);
  return (
    <div className={styles["items"]}>
      <h1 className={styles["title"]}>{resName?.toUpperCase()}</h1>
      <section className={styles["items-container"]}>
        {resItems?.map((item, idx) => (
          <div
            key={item.id}
            className={`${styles["item-card"]} ${
              idx % 2 == 0 ? styles["left-pos"] : styles["right-pos"]
            }`}
          >
            <img
              src={item.imageSrc}
              className={
                idx % 2 == 0 ? styles["left-pos"] : styles["right-pos"]
              }
            />
            <div>
              <h1>{item.name}</h1>
              <p>{item.description}</p>
              <span>{item.Price}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
