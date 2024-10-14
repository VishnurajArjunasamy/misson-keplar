import React, { useEffect, useState } from "react";
import styles from "./shopping.module.scss";
import { useParams } from "react-router-dom";
import { ProductI } from "../../../modals/productModal";
import ProductsContainer from "../../../containers/products-container/products-container";
import { getProducts } from "../../../services/productServices";

export default function Shopping() {
  const { categoryId } = useParams();
  const [prodcuts, setProducts] = useState<ProductI[] | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      const result = await getProducts(categoryId);
      setProducts(result);
    }
    fetchData();
  }, [categoryId]);

  return (
    <div className={styles["shopping-page"]}>
      <ProductsContainer products={prodcuts} />
    </div>
  );
}
