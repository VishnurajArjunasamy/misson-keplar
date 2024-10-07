import React, { useEffect, useState } from "react";
import { RestaurantIF } from "../../models/restaurantModel";
import { DishResIF } from "../../models/dishModel";
import { OrderIF } from "../../models/orderModel";
import { getAvailableCategory } from "../../utils/commonUtils";
import { getRestaurants } from "../../services/restaurantService";
import styles from "./reserve-form.module.scss";
import Input from "../common/input/input";
import Checkbox from "../common/checkbox/checkbox";
import Dropdown from "../common/dropdown/dropdown";
import NumberInput from "../common/number-input/number-input";
import { RESERVE } from "../../constants/app.constants";

const { ORDER_FORM } = RESERVE;
const {
  FIRST_NAME,
  LAST_NAME,
  MOBILE,
  EMAIL,
  DATE,
  TIME,
  PREFERENCE,
  PERSONS,
  CATEGORY,
  RESTAURANT,
  RESERVE_TABLE,
} = ORDER_FORM;

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
  const [restaurants, setRestaurants] = useState<RestaurantIF[] | undefined>(
    undefined
  );

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

  return (
    <form className={styles["reserve-form"]} onSubmit={(e) => handleSubmit(e)}>
      <div className={styles["split-container"]}>
        <div className={styles["splits"]}>
          <Input
            label={FIRST_NAME.label}
            value={order.firstName}
            onChange={(e) => handleChange(e, FIRST_NAME.key)}
            required
          />
        </div>
        <div className={styles["splits"]}>
          <Input
            label={LAST_NAME.label}
            value={order.lastName}
            onChange={(e) => handleChange(e, LAST_NAME.key)}
            required
          />
        </div>
      </div>

      <Input
        label={EMAIL.label}
        type="email"
        value={order.email}
        onChange={(e) => handleChange(e, EMAIL.key)}
        required
      />
      <Input
        label={MOBILE.label}
        type="tel"
        value={order.mobile}
        onChange={(e) => handleChange(e, MOBILE.key)}
        required
      />

      <div className={styles["split-container"]}>
        <div className={styles["splits"]}>
          <Input
            label={DATE.label}
            type="date"
            value={order.date}
            onChange={(e) => handleChange(e, DATE.key)}
            required
          />
        </div>
        <div className={styles["splits"]}>
          <Input
            label={DATE.label}
            type="time"
            value={order.time}
            onChange={(e) => handleChange(e, DATE.key)}
            required
          />
        </div>
      </div>

      <Checkbox
        label={PREFERENCE.label}
        preference={order.preference}
        handleChange={(e, type: string) => handleCheckChange(e, type)}
      />

      <Dropdown
        label={CATEGORY.label}
        value={order.category}
        options={availableCategory && Object.keys(availableCategory)}
        onChange={(e) => handleChange(e, CATEGORY.key)}
        required
      />
      <Dropdown
        label={RESTAURANT.label}
        value={order.restaurant}
        options={setRestaurantOptions()}
        onChange={(e) => handleChange(e, RESTAURANT.key)}
        required
      />
      <NumberInput
        label={PERSONS.label}
        value={order.totalPersons}
        onChange={(e) => {
          handleChange(e, PERSONS.key);
        }}
        handleNumberIncrement={handleNumberIncrement}
        handleNumberDecrement={handleNumberDecrement}
        required
      />
      <button type={"submit"} className={styles["submit-btn"]}>
        {RESERVE_TABLE}
      </button>
    </form>
  );
}
