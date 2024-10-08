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
import { object, string, number, date } from "yup";

//Constants import
const { ORDER_FORM, MOBILE_REGEX, FORM_ERRORS } = RESERVE;
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

//form schema
// const formSchema = object({
//   firstName: string().required(FORM_ERRORS.FIRST_NAME_REQ),
//   lastName: string().required(FORM_ERRORS.LAST_NAME_REQ),
//   email: string().email(FORM_ERRORS.EMAIL_ERR).required(FORM_ERRORS.EMAIL_ERR),
//   mobile: string().matches(MOBILE_REGEX, FORM_ERRORS.MOBILE_ERR),
//   date: date().required(FORM_ERRORS.DATE_ERR),
//   time: string().required(FORM_ERRORS.TIME_ERR),
//   category: string().required(FORM_ERRORS.CATEGORY_ERR),
//   restaurant: string().required(FORM_ERRORS.RES_ERR),
//   totalPersons: number()
//     .integer()
//     .max(99)
//     .min(1)
//     .required(FORM_ERRORS.NO_OF_PS.REQUIRED),
// });

export default function ReserveForm({
  order,
  setOrder,
  setIsSubmitted,
}: FormProps) {
  const [restaurants, setRestaurants] = useState<RestaurantIF[] | undefined>(
    undefined
  );

  const [error, setError] = useState({});

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

  function isValidDate(selectedDate) {
    const currentDate = new Date();
    const givenDate = new Date(selectedDate);

    if (givenDate >= currentDate) {
      return true;
    }

    return false;
  }

  function validate(formData) {
    const errors = {};
    if (!formData.firstName) {
      errors.firstName = "Name is required";
    } else if (formData.name.length < 2) {
      errors.firstName = "Name must be at least 2 characters";
    }

    if (!formData.lastName) {
      errors.lastName = "Name is required";
    } else if (formData.name.length < 2) {
      errors.lastName = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.mobile) {
      errors.mobile = "Mobile Number is required";
    } else if (!MOBILE_REGEX.test(formData.email)) {
      errors.mobile = "Mobile Number is invalid";
    }

    if (!formData.date) {
      errors.date = "Booking Date is required";
    } else if (isValidDate(formData.date)) {
      errors.date = " Booking Date must not be a past date";
    }

    if (!formData.time) {
      errors.date = "Booking Time is required";
    }

    if (!formData.category) {
      errors.category = "Category is required";
    }

    if (!formData.restaurant) {
      errors.restaurant = "Restaurant name is required";
    }

    if (!formData.totalPersons) {
      errors.totalPersons = "No. of Persons is required";
    } else if (formData.totalPersons > 100) {
      errors.totalPersons = "Booking for more than 100 people is not possible";
    }

    return errors;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const validationErrors: object = validate(formJson);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Data:", formData);
      // setOrder(formJson);
      // setIsSubmitted(true);
    } else {
      setError(validationErrors);
    }
  }

  return (
    <form className={styles["reserve-form"]} onSubmit={(e) => handleSubmit(e)}>
      <div className={styles["split-container"]}>
        <div className={styles["splits"]}>
          <Input
            label={FIRST_NAME.label}
            // value={order.firstName}
            name={FIRST_NAME.key}
            // onChange={(e) => handleChange(e, FIRST_NAME.key)}
          />
          {error.firstName && <p>{error.firstName}</p>}
        </div>
        <div className={styles["splits"]}>
          <Input
            label={LAST_NAME.label}
            // value={order.lastName}
            name={LAST_NAME.key}
            // onChange={(e) => handleChange(e, LAST_NAME.key)}
          />
          {error.lastName && <p>{error.lastName}</p>}
        </div>
      </div>
      <Input
        label={EMAIL.label}
        type="email"
        // value={order.email}
        name={EMAIL.key}
        // onChange={(e) => handleChange(e, EMAIL.key)}
      />
      <Input
        label={MOBILE.label}
        type="tel"
        // value={order.mobile}
        name={MOBILE.key}
        // onChange={(e) => handleChange(e, MOBILE.key)}
      />

      <div className={styles["split-container"]}>
        <div className={styles["splits"]}>
          <Input
            label={DATE.label}
            type="date"
            // value={order.date}
            name={DATE.key}
            // onChange={(e) => handleChange(e, DATE.key)}
          />
        </div>
        <div className={styles["splits"]}>
          <Input
            label={TIME.label}
            type="time"
            // value={order.time}
            name={TIME.key}
            // onChange={(e) => handleChange(e, TIME.key)}
          />
        </div>
      </div>

      <Checkbox
        label={PREFERENCE.label}
        name={PREFERENCE.key}
        preference={order.preference}
        // handleChange={(e, type: string) => handleCheckChange(e, type)}
      />

      <Dropdown
        label={CATEGORY.label}
        value={order.category}
        name={CATEGORY.key}
        options={availableCategory && Object.keys(availableCategory)}
        onChange={(e) => handleChange(e, CATEGORY.key)}
      />
      <Dropdown
        label={RESTAURANT.label}
        value={order.restaurant}
        name={RESTAURANT.key}
        options={setRestaurantOptions()}
        onChange={(e) => handleChange(e, RESTAURANT.key)}
      />
      <NumberInput
        label={PERSONS.label}
        value={order.totalPersons}
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
