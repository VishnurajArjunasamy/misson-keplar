import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./navbar.module.scss";
import logo from "../../assets/logos/logo.png";
import { MENUS } from "../../constants/app-constants";
import { SESSION } from "../../constants/app-constants";
import { useAuth } from "../../context/auth-context";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { pathname } = location;

  const menus = Object.values(MENUS).map((menu) => {
    if (menu.NAME == MENUS.NOWSHOWING.NAME && !user) return;
    const style = `/${menu.ROUTE}` == pathname ? styles["active"] : "";

    return (
      <Link to={`/${menu.ROUTE}`} key={menu.NAME} className={style}>
        {menu.NAME}
      </Link>
    );
  });

  /**
   * Show User Name and Logout  if user is Logged in
   * Else Show Login
   */
  let session;
  if (user) {
    session = (
      <div className={styles["user-info"]}>
        <span>
          {SESSION.GREETINGS} {user.replace(/"/g, "")}
        </span>
        {" | "}
        <Link replace={true} to={`/${MENUS.HOME.ROUTE}`} onClick={logout}>
          {SESSION.LOGOUT.NAME}
        </Link>
      </div>
    );
  } else {
    session = <Link to={SESSION.LOGIN.ROUTE}>{SESSION.LOGIN.NAME}</Link>;
  }

  return (
    <>
      <nav className={styles["navbar"]}>
        <Link to={`/${MENUS.HOME.ROUTE}`}>
          <img src={logo} />
        </Link>

        {pathname != "/login" && (
          <>
            <div className={styles["menus"]}>{menus}</div>
            <div className={styles["session"]}>{session}</div>
          </>
        )}
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
