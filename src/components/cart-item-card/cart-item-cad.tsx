import React from "react";
import styles from "./cart-item.module.scss";
import { CartItemI, WishlistItemI } from "../../modals/cartModal";
import CounterBtn from "../counter-btn/counter-btn";
import { CART, PRODUCTS } from "../../constants/app.constant";
import Button from "../button/button";

interface CartItemCardPropsI {
  cart: CartItemI[] | undefined;
  setCart: React.Dispatch<React.SetStateAction<CartItemI[] | undefined>>;
  wishlist: WishlistItemI[] | undefined;
  setWishlist: React.Dispatch<
    React.SetStateAction<WishlistItemI[] | undefined>
  >;
  data: CartItemI | WishlistItemI;
  type: string;
}

export default function CartItemCard({
  data,
  type,
  cart,
  setCart,
  wishlist,
  setWishlist,
}: CartItemCardPropsI) {
  //Decrease cart item quantity
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

  //Increase cart item quantity
  function handleCartDecrement(id: number) {
    const item = cart?.find((item) => item.id == id);
    if (item && item?.quantity <= 1) {
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

  //adding Item to cart form wishlist
  function handleAddCart() {
    const isItemInCart = cart?.find((item) => item.id == data.id);
    if (isItemInCart) {
      setCart(
        cart?.map((item) =>
          item.id == data.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([
        ...(cart || []),
        {
          id: data.id,
          name: data.name,
          photo: data.photo,
          price: data.price,
          description:data.description,
          quantity: 1,
        },
      ]);
    }

    //remove wishlisted item from wishlist
    setWishlist(wishlist.filter((wish) => wish.id != data.id));
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
          {(+data.price).toLocaleString("en-IN")}
        </span>
      </div>
      <div className={styles["cart-function-btn"]}>
        {type == CART.CART_TABS.myCart.id ? (
          <CounterBtn
            quantity={data.quantity}
            handleCartIncrement={() => handleCartIncrement(data.id)}
            handleCartDecrement={() => handleCartDecrement(data.id)}
          />
        ) : (
          <Button
            name={PRODUCTS.ADD_TO_CART}
            type="sm"
            onClick={handleAddCart}
          />
        )}
      </div>
    </div>
  );
}
