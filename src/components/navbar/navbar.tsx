import React from "react";
import styles from "./navbar.module.scss";
import { NAVBAR } from "../../constants/app.constants.ts";

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <h1>{NAVBAR.SHOP_NAME}</h1>
      <ol>
        <li>{NAVBAR.HOME}</li>
        <li>{NAVBAR.RESTAURANTS}</li>
        <li>{NAVBAR.RESERVE}</li>
      </ol>
    </nav>
  );
}
