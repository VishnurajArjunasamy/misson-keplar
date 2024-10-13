import React, { useEffect, useState } from "react";
import styles from "./category-container.module.scss";
import { ProductCategoryI } from "../../modals/productModal";
import CategoryCard from "../../components/category-card/category-card";
import { getProductCategories } from "../../services/productServices";

export default function CategoryContainer() {
  const [categories, setCatagories] = useState<ProductCategoryI[] | undefined>(
    undefined
  );

  useEffect(() => {
    async function fetchData() {
      const response = await getProductCategories();

      setCatagories(response);
    }

    fetchData();
  }, []);
  return (
    <section className={styles["card-container"]}>
      {categories?.map((category) => {
        return <CategoryCard key={category.id} category={category} />;
      })}
    </section>
  );
}
