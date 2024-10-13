import React from "react";
import { HOME } from "../../constants/app.constant";
import styles from "./header.module.scss";
import down from "../../assets/logos/caret-down.png";

const { SITBACK, MENUS } = HOME;

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>{SITBACK}</h1>
      <ul className={styles.menu}>
        {Object.values(MENUS).map((menu) => (
          <li key={menu} className={styles["category-active"]}>
            {menu}
          </li>
        ))}
        {/* <li className={styles['category-active']}>{Menus.COUCHES}</li>
        <li>{Menus.CHAIRS}</li>
        <li>{Menus.DINING}</li> */}
      </ul>
      <div className={styles["user-profile"]}>
        <p>Vizz</p>
        <img src={down} />
      </div>
    </header>
  );
}
