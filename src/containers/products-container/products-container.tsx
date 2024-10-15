import React from "react";
import styles from "./products-container.module.scss";
import { ProductI } from "../../modals/productModal";
import ProductCard from "../../components/product-card/product-card";

interface ProductsContainerPropsI {
  products: ProductI[] | undefined;
  isEmptyCart: boolean;
}

export default function ProductsContainer({
  products,
  isEmptyCart = true,
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
        />
      ))}
    </section>
  );
}
