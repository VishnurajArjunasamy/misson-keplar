import React, { useState } from "react";
import styles from "./cart-section.module.scss";
import PriceCard from "../price-card/price-card";
import { CartItemI } from "../../modals/cartModal";
import CartItemCard from "../cart-item-card/cart-item-cad";
import { CART } from "../../constants/app.constant";

interface CartSectionPropsI {
  cart: CartItemI[] | undefined;
  setCart: React.Dispatch<React.SetStateAction<CartItemI[] | undefined>>;

}

const { CART_TABS } = CART;

export default function CartSection({ cart,setCart }: CartSectionPropsI) {
  const [activeTab, setActiveTab] = useState(CART_TABS.myCart.id);
  const wishList = ["wish 1", "wish 2"];
  const items = activeTab == CART_TABS.myCart.id ? cart : wishList;
  return (
    <div className={styles["cart-section"]}>
      <ul className={styles["cart-tab"]}>
        {Object.values(CART_TABS).map((tab) => (
          <li
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={activeTab == tab.id ? styles["active"] : undefined}
          >
            {tab.name}
          </li>
        ))}
      </ul>
      <div className={styles["cart-items-container"]}>
        {items?.map((item) => (
          <CartItemCard
            key={item.id}
            data={item}
            type={activeTab}
            cart={cart}
            setCart={setCart}
          />
        ))}
      </div>
      {
        <div className={styles["price-section"]}>
          <PriceCard cart={cart}/>
        </div>
      }
    </div>
  );
}
