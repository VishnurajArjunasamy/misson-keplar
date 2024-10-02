import React, { useEffect, useState } from "react";
import { DishResIF, OrderIF, RestaurantIF } from "../../types/restaurantType";
import { getAvailableCategory } from "../../utils/commonUtils";
import { getRestaurants } from "../../services/restaurantService";
import styles from "./reserve-form.module.scss";
import Input from "../common/input/input";
import Checkbox from "../common/checkbox/checkbox";
import Dropdown from "../common/dropdown/dropdown";
import NumberInput from "../common/number-input/number-input";

interface FormProps {
  order: OrderIF;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  setOrder: React.Dispatch<React.SetStateAction<OrderIF>>;
}

export default function ReserveForm({
  order,
  setOrder,
  setIsSubmitted,
}: FormProps) {
  const [restaurants, setRestaurants] = useState<RestaurantIF[] | null>(null);

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

  function handleNumberIncrement() {
    setOrder((prev) => ({ ...prev, totalPersons: +prev.totalPersons + 1 }));
  }

  function handleNumberDecrement() {
    setOrder((prev) => ({
      ...prev,
      totalPersons: prev.totalPersons == 0 ? 0 : +prev.totalPersons - 1,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitted(true);
    console.log("submitted");
  }

  console.log(order);
  return (
    <form className={styles["reserve-form"]} onSubmit={(e) => handleSubmit(e)}>
      <div className={styles["split-container"]}>
        <div className={styles["splits"]}>
          <Input
            label="First name"
            value={order.firstName}
            onChange={(e) => handleChange(e, "firstName")}
            required
          />
        </div>
        <div className={styles["splits"]}>
          <Input
            label="Last name"
            value={order.lastName}
            onChange={(e) => handleChange(e, "lastName")}
            required
          />
        </div>
      </div>

      <Input
        label="Email address"
        type="email"
        value={order.email}
        onChange={(e) => handleChange(e, "email")}
        required
      />
      <Input
        label="Mobile number"
        type="tel"
        value={order.mobile}
        onChange={(e) => handleChange(e, "mobile")}
        required
      />

      <div className={styles["split-container"]}>
        <div className={styles["splits"]}>
          <Input
            label="Date you want to book"
            type="date"
            value={order.date}
            onChange={(e) => handleChange(e, "date")}
            required
          />
        </div>
        <div className={styles["splits"]}>
          <Input
            label="Time"
            type="time"
            value={order.time}
            onChange={(e) => handleChange(e, "time")}
            required
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
        required
      />
      <Dropdown
        label="Choose a restaurant"
        value={order.restaurant}
        options={setRestaurantOptions()}
        onChange={(e) => handleChange(e, "restaurant")}
        required
      />
      <NumberInput
        label="No of persons"
        value={order.totalPersons}
        onChange={(e) => {
          handleChange(e, "totalPersons");
        }}
        handleNumberIncrement={handleNumberIncrement}
        handleNumberDecrement={handleNumberDecrement}
        required
      />
      <button type={"submit"} className={styles["submit-btn"]}>
        RESERVE MY TABLE
      </button>
    </form>
  );
}
