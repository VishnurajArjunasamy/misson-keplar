import { Link, Outlet } from "react-router-dom";
import styles from "./navbar.module.scss";
import logo from "../../assets/logos/logo.png";
import { MENUS } from "../../constants/app-constants";
import { SESSION } from "../../constants/app-constants";

const Navbar = () => {
  const menus = Object.values(MENUS).map((menu) => {
    return (
      <Link to={`${menu.ROUTE}`} key={menu.NAME}>
        {menu.NAME}
      </Link>
    );
  });
  const session = <Link to={SESSION.LOGIN.ROUTE}>{SESSION.LOGIN.NAME}</Link>;
  return (
    <>
      <nav className={styles["navbar"]}>
        <img src={logo} />
        <div className={styles["menus"]}>{menus}</div>
        <div className={styles["session"]}>{session}</div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
