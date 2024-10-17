import React from "react";
import styles from "./category-card.module.scss";
import { ProductCategoryI } from "../../modals/productModal";
import Button from "../button/button";
import { HOME } from "../../constants/app.constant";
import { useNavigate } from "react-router-dom";

interface CatCardPropsI {
  category: ProductCategoryI;
}

export default function CategoryCard({ category }: CatCardPropsI) {
  const navigate = useNavigate();

  function handleCategoryClick() {
    navigate(`/categories/${category.category.toLocaleLowerCase()}`);
  }
  return (
    <div className={styles["category-card"]}>
      <>
        <img src={category.photo} />
        <h1>{category.category}</h1>
        <p>{category.description}</p>
        <Button name={HOME.SHOP_NOW} type="l" onClick={handleCategoryClick} />
      </>
    </div>
  );
}
