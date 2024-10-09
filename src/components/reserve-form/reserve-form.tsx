import React, { useEffect, useState } from "react";
import { RestaurantIF } from "../../models/restaurantModel";
import { DishResIF } from "../../models/dishModel";
import { OrderIF } from "../../models/orderModel";
import { getAvailableCategory, validate } from "../../utils/commonUtils";
import { getRestaurants } from "../../services/restaurantService";
import styles from "./reserve-form.module.scss";
import Input from "../common/input/input";
import Checkbox from "../common/checkbox/checkbox";
import Dropdown from "../common/dropdown/dropdown";
import NumberInput from "../common/number-input/number-input";
import { RESERVE } from "../../constants/app.constants";

//Constants import
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

//Interface for Form props
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

  const [error, setError] = useState({});

  useEffect(() => {
    async function fetchData() {
      const result = await getRestaurants();
      setRestaurants(result);
    }
    fetchData();
  }, []);

  let availableCategory: DishResIF;
  if (restaurants) {
    availableCategory = getAvailableCategory(restaurants);
  }

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
    const form = e.currentTarget;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const validationErrors: object = validate(formJson);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Data:", formData);
      setOrder(formJson);
      setIsSubmitted(true);
    } else {
      setError(validationErrors);
    }
  }

  return (
    <form
      className={styles["reserve-form"]}
      onSubmit={(e) => handleSubmit(e)}
      noValidate
    >
      <div className={styles["split-container"]}>
        <div className={styles["splits"]}>
          <Input
            label={FIRST_NAME.label}
            errors={error}
            name={FIRST_NAME.key}
          />
        </div>
        <div className={styles["splits"]}>
          <Input label={LAST_NAME.label} errors={error} name={LAST_NAME.key} />
        </div>
      </div>
      <Input label={EMAIL.label} errors={error} type="email" name={EMAIL.key} />

      <Input label={MOBILE.label} type="tel" errors={error} name={MOBILE.key} />

      <div className={styles["split-container"]}>
        <div className={styles["splits"]}>
          <Input
            label={DATE.label}
            errors={error}
            type=""
            onBlur={(e) =>
              e.target.value == "" ? (e.target.type = "") : undefined
            }
            onFocus={(e) => (e.target.type = "date")}
            name={DATE.key}
          />
        </div>
        <div className={styles["splits"]}>
          <Input
            label={TIME.label}
            errors={error}
            type=""
            onBlur={(e) =>
              e.target.value == "" ? (e.target.type = "") : undefined
            }
            onFocus={(e) => {
              return (e.target.type = "time");
            }}
            name={TIME.key}
          />
        </div>
      </div>

      <div>
        <Checkbox
          label={PREFERENCE.label}
          name={PREFERENCE.key}
          preference={order.preference}
        />
        {error.preference && (
          <p className={styles["error-txt"]}>{error.preference}</p>
        )}
      </div>

      <Dropdown
        label={CATEGORY.label}
        value={order.category}
        errors={error}
        name={CATEGORY.key}
        options={availableCategory && Object.keys(availableCategory)}
        onChange={(e) => handleChange(e, CATEGORY.key)}
      />
      <Dropdown
        label={RESTAURANT.label}
        value={order.restaurant}
        errors={error}
        name={RESTAURANT.key}
        options={setRestaurantOptions()}
        onChange={(e) => handleChange(e, RESTAURANT.key)}
      />
      <NumberInput
        label={PERSONS.label}
        value={order.totalPersons}
        errors={error}
        name={PERSONS.key}
        onChange={(e) => {
          handleChange(e, PERSONS.key);
        }}
        handleNumberIncrement={handleNumberIncrement}
        handleNumberDecrement={handleNumberDecrement}
      />
      <button type={"submit"} className={styles["submit-btn"]}>
        {RESERVE_TABLE}
      </button>
    </form>
  );
}
