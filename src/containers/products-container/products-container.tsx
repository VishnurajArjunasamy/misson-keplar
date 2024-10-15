import React from "react";
import styles from "./products-container.module.scss";
import { ProductI } from "../../modals/productModal";
import ProductCard from "../../components/product-card/product-card";
import { CartItemI } from "../../modals/cartModal";

interface ProductsContainerPropsI {
  products: ProductI[] | undefined;
  cart: CartItemI[] | undefined;
  setCart: React.Dispatch<React.SetStateAction<CartItemI[] | undefined>>;
}

export default function ProductsContainer({
  products,
  setCart,
  cart,
}: ProductsContainerPropsI) {
  const isEmptyCart = cart == undefined || cart.length < 1;

  const style = isEmptyCart
    ? styles["products-container"]
    : `${styles["products-container"]} ${styles["shrink-container"]}`;
  return (
    <section className={style}>
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          productData={product}
          isEmptyCart={isEmptyCart}
          setCart={setCart}
          cart={cart}
        />
      ))}
    </section>
  );
}
