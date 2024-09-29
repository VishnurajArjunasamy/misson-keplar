import React, { useEffect, useState } from "react";
import styles from "./restaurants.module.scss";
import RestaurantCard from "../../components/restaurant-card/restaurant-card";
import { getRestaurants } from "../../services/restaurantService";
import { RestaurantIF } from "../../types/restaurantType";

export default function Restaurant() {
  const [restaurants, setRestaurants] = useState<RestaurantIF[] | null>(null);
  useEffect(() => {
    async function fetchData() {
      const result = await getRestaurants();
      setRestaurants(result);
    }
    fetchData();
  }, []);

  const restaurantList = restaurants?.map((restaurant: RestaurantIF) => {
    return <RestaurantCard key={restaurant.id} data={restaurant} />;
  });
  return (
    <div className={styles["restaurant"]}>
      <section className={styles["res-card-container"]}>
        {restaurantList}
      </section>
    </div>
  );
}
