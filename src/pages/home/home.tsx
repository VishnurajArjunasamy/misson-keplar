import React from "react";
import Header from "../../components/header/header";
import { HOME } from "../../constants/app.constant";
import styles from "./home.module.scss";
import CategoryContainer from "../../containers/category-container/category-container";
import Footer from "../../components/footer/footer";

const { QUOTE_1, QUOTE_2 } = HOME;

export default function Home() {
  return (
    <div className={styles["home-page"]}>
      <Header />
      <div className={styles["quotes"]}>
        <h1>{QUOTE_1}</h1>
        <h2>{QUOTE_2}</h2>
      </div>
      <CategoryContainer />
      <Footer />
    </div>
  );
}
