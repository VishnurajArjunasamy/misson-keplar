import React from "react";
import styles from "./loader.module.scss";

export default function Loader() {
  return (
    <div className={styles["loader-overlay"]}>
      <div className={styles["loader"]}></div>
    </div>
  );
}
