import React, { useEffect, useState } from "react";
import styles from "./restaurants.module.scss";
import RestaurantCard from "../../components/restaurant-card/restaurant-card";
import { getRestaurants } from "../../services/restaurant";

export default function Restaurant() {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await getRestaurants();
      setRestaurants(result);
    }
    fetchData();
  }, []);

  const restautrantList = restaurants?.map((restaurant) => {
    <RestaurantCard key={restaurant.id} data={restaurant} />;
  });
  return (
    <div className={styles["restaurant"]}>
      <section className={styles["res-card-container"]}>
        {restautrantList}
      </section>
    </div>
  );
}
