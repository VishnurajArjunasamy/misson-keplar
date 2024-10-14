import React from "react";
import { HOME } from "../../constants/app.constant";
import styles from "./header.module.scss";
import down from "../../assets/logos/caret-down.png";
import { Link, Outlet, useParams } from "react-router-dom";

const { SITBACK, MENUS } = HOME;

export default function Header() {
  const { categoryId } = useParams();
  return (
    <>
      <header className={styles.header}>
        <h1>
          <Link to="/">{SITBACK}</Link>
        </h1>
        <ul className={styles.menu}>
          {Object.values(MENUS).map((menu) => (
            <li
              key={menu}
              className={
                menu.toLocaleLowerCase() == categoryId
                  ? styles["category-active"]
                  : undefined
              }
            >
              <Link to={`categories/${menu.toLocaleLowerCase()}`}>{menu}</Link>
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
      <Outlet />
    </>
  );
}
