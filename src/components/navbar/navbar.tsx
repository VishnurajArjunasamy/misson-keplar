import React, { useState } from "react";
import styles from "./navbar.module.scss";
import { NAVBAR } from "../../constants/app.constants.ts";
import { Link, Outlet, useLocation } from "react-router-dom";

const { MENU, SHOP_NAME } = NAVBAR;

export default function NavBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string): boolean => {
    return path === currentPath;
  };

  const linkItems = MENU.map((menu) => {
    return (
      <Link
        key={menu.path}
        to={menu.path}
        className={isActive(menu.path) ? styles["active"] : undefined}
      >
        {menu.name}
      </Link>
    );
  });
  return (
    <>
      <nav
        className={
          currentPath === MENU[0].path
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
