import React from "react";
import styles from "./home.module.scss";
import CategoryContainer from "../../containers/category-container/category-container";
import Footer from "../../components/footer/footer";
import Quotes from "../../components/quotes/quotes";

export default function Home() {
  return (
    <div className={styles["home-page"]}>
      <Quotes />
      <CategoryContainer />
      <Footer />
    </div>
  );
}
