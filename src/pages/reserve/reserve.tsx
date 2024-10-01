import React, { useEffect, useState } from "react";
import styles from "./reserve.module.scss";
import Input from "../../components/common/input/input";
import { getRestaurants } from "../../services/restaurantService";
import { DishResIF, RestaurantIF } from "../../types/restaurantType";
import { getAvailableCategory } from "../../utils/commonUtils";
import Dropdown from "../../components/common/dropdown/dropdown";
import Checkbox from "../../components/common/checkbox/checkbox";

export default function Reserve() {
  const [restaurants, setRestaurants] = useState<RestaurantIF[] | null>(null);
  const [order, setOrder] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    date: "",
    time: "",
    preference: {
      veg: false,
      nonVeg: false,
    },
    category: "",
    restaurant: "",
    totalPersons: 0,
  });

  let availableCategory: DishResIF;
  if (restaurants) {
    availableCategory = getAvailableCategory(restaurants);
  }

  useEffect(() => {
    async function fetchData() {
      const result = await getRestaurants();
      setRestaurants(result);
    }
    fetchData();
  }, []);

  function setRestaurantOptions() {
    let restaurantOptions;
    if (availableCategory) {
      restaurantOptions = availableCategory[order.category];
    }
    return restaurantOptions;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: string
  ) {
    setOrder((prev) => ({ ...prev, [key]: e.target.value }));
  }

  function handleCheckChange(
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) {
    setOrder((prev) => ({
      ...prev,
      preference: { ...prev.preference, [type]: e.target.checked },
    }));
  }

  console.log(order);

  return (
    <div className={styles["reserve"]}>
      <form className={styles["reserve-form"]}>
        <div className={styles["split-container"]}>
          <div className={styles["splits"]}>
            <Input
              label="First name"
              value={order.firstName}
              onChange={(e) => handleChange(e, "firstName")}
            />
          </div>
          <div className={styles["splits"]}>
            <Input
              label="Last name"
              value={order.lastName}
              onChange={(e) => handleChange(e, "lastName")}
            />
          </div>
        </div>

        <Input
          label="Email address"
          type="email"
          value={order.email}
          onChange={(e) => handleChange(e, "email")}
        />
        <Input
          label="Mobile number"
          type="tel"
          value={order.mobile}
          onChange={(e) => handleChange(e, "mobile")}
        />

        <div className={styles["split-container"]}>
          <div className={styles["splits"]}>
            <Input
              label="Date you want to book"
              type="date"
              value={order.date}
              onChange={(e) => handleChange(e, "date")}
            />
          </div>
          <div className={styles["splits"]}>
            <Input
              label="Time"
              type="time"
              value={order.time}
              onChange={(e) => handleChange(e, "time")}
            />
          </div>
        </div>

        <Checkbox
          label="Choose your preference"
          preference={order.preference}
          handleChange={(e, type: string) => handleCheckChange(e, type)}
        />

        <Dropdown
          label="Choose a category"
          value={order.category}
          options={availableCategory && Object.keys(availableCategory)}
          onChange={(e) => handleChange(e, "category")}
        />
        <Dropdown
          label="Choose a restaurant"
          value={order.restaurant}
          options={setRestaurantOptions()}
          onChange={(e) => handleChange(e, "category")}
        />
      </form>
    </div>
  );
}
