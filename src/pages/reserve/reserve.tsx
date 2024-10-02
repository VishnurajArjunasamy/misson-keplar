import React, { useState } from "react";
import styles from "./reserve.module.scss";

import ReserveForm from "../../components/reserve-form/reserve-form";
import ConfirmationBox from "../../components/confirmation-box/confirmation-box";
import { OrderIF } from "../../types/restaurantType";

export default function Reserve() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderIF>({
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

  return (
    <div className={styles["reserve"]}>
      <div className={styles["reserve-container"]}>
        {!isSubmitted && (
          <ReserveForm
            order={order}
            setOrder={setOrder}
            setIsSubmitted={setIsSubmitted}
          />
        )}
        {isSubmitted && (
          <ConfirmationBox
            tPersons={order.totalPersons}
            resName={order.restaurant}
            time={order.time}
            date={order.date}
          />
        )}
      </div>
    </div>
  );
}
