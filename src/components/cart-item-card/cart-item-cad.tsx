import React from "react";
import styles from "./cart-item.module.scss";
import { CartItemI } from "../../modals/cartModal";
import CounterBtn from "../counter-btn/counter-btn";
import { PRODUCTS } from "../../constants/app.constant";

interface CartItemCardPropsI {
  cart: CartItemI[] | undefined;
  setCart: React.Dispatch<React.SetStateAction<CartItemI[] | undefined>>;
  data: CartItemI;
  type: string;
}

export default function CartItemCard({
  data,
  type,
  cart,
  setCart,
}: CartItemCardPropsI) {
  function handleCartIncrement(id: number) {
    setCart(
      cart?.map((item) => {
        return item.id == id
          ? {
              ...item,
              quantity: item.quantity < 100 ? item.quantity + 1 : item.quantity,
            }
          : item;
      })
    );
  }

  function handleCartDecrement(id: number) {
    const item = cart?.find((item) => item.id == id);
    if (item?.quantity <= 1) {
      setCart(cart?.filter((item) => item.id != id));
    } else {
      setCart(
        cart?.map((item) => {
          return item.id == id
            ? {
                ...item,
                quantity: item.quantity > 0 ? item.quantity - 1 : item.quantity,
              }
            : item;
        })
      );
    }
  }

  if (type == "myCart" && data.quantity == 0) {
    return;
  }

  return (
    <div className={styles["cart-item-card"]}>
      <img src={data.photo} alt={data.name} />
      <div className={styles["info-container"]}>
        <h2>{data.name}</h2>
        <span>
          <i className={styles["currency-txt"]}>{PRODUCTS.CURRENCY_TYPE}</i>
          {data.price}
        </span>
      </div>
      <div className={styles["cart-quantity-btn"]}>
        <CounterBtn
          quantity={data.quantity}
          handleCartIncrement={() => handleCartIncrement(data.id)}
          handleCartDecrement={() => handleCartDecrement(data.id)}
        />
      </div>
    </div>
  );
}
