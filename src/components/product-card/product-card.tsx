import React from "react";
import { ProductI } from "../../modals/productModal";
import styles from "./product-card.module.scss";
import Guarantee from "../guarantee/guarantee";
import { PRODUCTS } from "../../constants/app.constant";
import Button from "../button/button";
import { CartItemI, WishlistItemI } from "../../modals/cartModal";

interface ProductCardPropsI {
  productData: ProductI;
  isEmptyCart: boolean;
  cart: CartItemI[] | undefined;
  setCart: React.Dispatch<React.SetStateAction<CartItemI[] | undefined>>;
  wishlist: WishlistItemI[] | undefined;
  setWishlist: React.Dispatch<
    React.SetStateAction<WishlistItemI[] | undefined>
  >;
}

export default function ProductCard({
  productData,
  isEmptyCart,
  setCart,
  cart,
  wishlist,
  setWishlist,
}: ProductCardPropsI) {
  const style = isEmptyCart
    ? styles["product-card"]
    : `${styles["product-card"]} ${styles["shrink-card"]}`;

  const isItemInCart = cart?.find((item) => item.id == productData.id);
  const isItemInWishlist = wishlist?.find((item) => item.id == productData.id);

  function handleAddCart() {
    if (isItemInCart) {
      setCart(
        cart?.map((item) =>
          item.id == productData.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...(cart || []),
        {
          id: productData.id,
          name: productData.name,
          photo: productData.photo,
          price: productData.price,
          quantity: 1,
        },
      ]);
    }
  }

  function handleAddWishList() {
    if (!isItemInWishlist) {
      setWishlist([
        ...(wishlist || []),
        {
          id: productData.id,
          name: productData.name,
          photo: productData.photo,
          price: productData.price,
        },
      ]);
    }
  }

  return (
    <div className={style}>
      <img src={productData.photo} alt={productData.name} />
      <div className={styles["split-container"]}>
        <h2>{productData.name}</h2>
        <span>
          <i className={styles["currency-txt"]}>{PRODUCTS.CURRENCY_TYPE}</i>
          {(+productData.price).toLocaleString("en-IN")}
        </span>
      </div>
      <p>{productData.description}</p>
      <Guarantee years={productData.guarantee} />
      <div className={styles["line"]}></div>
      <div className={styles["btns-container"]}>
        <Button
          type="no-bg"
          name={PRODUCTS.ADD_TO_WISHLIST}
          onClick={handleAddWishList}
        />
        <Button type="l" name={PRODUCTS.ADD_TO_CART} onClick={handleAddCart} />
      </div>
    </div>
  );
}
