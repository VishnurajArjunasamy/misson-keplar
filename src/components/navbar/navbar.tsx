import React, { useState } from "react";
import styles from "./navbar.module.scss";
import { NAVBAR } from "../../constants/app.constants.ts";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function NavBar() {
  // const location = useLocation();
  const currentPath = "location.pathname";
  return (
    <>
      <nav className={styles.nav}>
        <h1>
          <Link to={"/"}>{NAVBAR.SHOP_NAME}</Link>
        </h1>
        <ol>
          <Link to={"/"} className={`${currentPath === "/" ? `active` : null}`}>
            {NAVBAR.HOME}
          </Link>

          <li className={`${currentPath === "/restaurants" ? `active` : null}`}>
            <Link to={"/restaurants"}>{NAVBAR.RESTAURANTS}</Link>
          </li>

          <Link
            to={"/reserve"}
            className={`${currentPath === "/reserve" ? `active` : null}`}
          >
            {NAVBAR.RESERVE}
          </Link>
        </ol>
      </nav>
      <Outlet />
    </>
  );
}
