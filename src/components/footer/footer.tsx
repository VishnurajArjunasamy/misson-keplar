import React from "react";
import styles from "./footer.module.scss";
import { HOME } from "../../constants/app.constant";

export default function Footer() {
  return (
    <footer className={styles["footer"]}>
      <p>{HOME.FOOTER_TXT}</p>
    </footer>
  );
}
