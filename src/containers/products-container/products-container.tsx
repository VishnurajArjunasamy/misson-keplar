import React from "react";
import styles from "./products-container.module.scss";
import { ProductI } from "../../modals/productModal";
import ProductCard from "../../components/product-card/product-card";
import { CartItemI } from "../../modals/cartModal";

interface ProductsContainerPropsI {
  products: ProductI[] | undefined;
  isEmptyCart: boolean;
  cart: CartItemI[]|undefined;
  setCart: React.Dispatch<React.SetStateAction<CartItemI[] | undefined>>;
}

export default function ProductsContainer({
  products,
  isEmptyCart = true,
  setCart,
  cart,
}: ProductsContainerPropsI) {
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
