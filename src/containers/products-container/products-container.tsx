import React from "react";
import styles from "./products-container.module.scss";
import { ProductI } from "../../modals/productModal";
import ProductCard from "../../components/product-card/product-card";

interface ProductsContainerPropsI {
  products: ProductI[] | undefined;
}

export default function ProductsContainer({
  products,
}: ProductsContainerPropsI) {
  return (
    <section className={styles["products-container"]}>
      {products?.map((product) => (
        <ProductCard key={product.id} productData={product} />
      ))}
    </section>
  );
}
