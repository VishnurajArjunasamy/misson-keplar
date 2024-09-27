import React from "react";
import Header from "../../components/header/header";
import { HOME } from "../../constants/app.constant";
import styles from "./home.module.scss";

const { QUOTE_1, QUOTE_2 } = HOME;

export default function Home() {
  return (
    <div className={styles["home-page"]}>
      {/* <Header /> */}
      <p className={styles["quote"]}>
        <h1>{QUOTE_1}</h1>
        <h2>{QUOTE_2}</h2>
      </p>
    </div>
  );
}
