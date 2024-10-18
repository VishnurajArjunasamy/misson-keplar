import React, { useEffect, useState } from "react";
import styles from "./category-container.module.scss";
import { ProductCategoryI } from "../../modals/productModal";
import CategoryCard from "../../components/category-card/category-card";
import { getProductCategories } from "../../services/productServices";
import Loader from "../../components/loader/loader";

export default function CategoryContainer() {
  const [categories, setCatagories] = useState<ProductCategoryI[] | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    async function fetchData() {
      const response = await getProductCategories();
      setCatagories(response);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={styles["card-container"]}>
      {categories?.map((category) => {
        return <CategoryCard key={category.id} category={category} />;
      })}
    </section>
  );
}
