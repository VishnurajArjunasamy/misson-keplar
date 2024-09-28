import React, { useState } from "react";
import styles from "./navbar.module.scss";
import { NAVBAR } from "../../constants/app.constants.ts";
import { Link, Outlet, useLocation } from "react-router-dom";
import { isEqual } from "../../utils/commonUtils.tsx";

const { MENU, SHOP_NAME } = NAVBAR;

export default function NavBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const linkItems = MENU.map((menu) => {
    return (
      <Link
        key={menu.path}
        to={menu.path}
        className={
          isEqual(menu.path, currentPath) ? styles["active"] : undefined
        }
      >
        {menu.name}
      </Link>
    );
  });
  return (
    <>
      <nav
        className={
          isEqual(MENU[0].path, currentPath)
            ? `${styles["nav"]} ${styles["nav-curved"]}`
            : styles["nav"]
        }
      >
        <h1>
          <Link to={MENU[0].path}>{SHOP_NAME}</Link>
        </h1>
        <ol>{linkItems}</ol>
      </nav>
      <Outlet />
    </>
  );
}
