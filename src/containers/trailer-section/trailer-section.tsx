import styles from "./trailer-section.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { MENUS, SESSION, TRAILERS } from "../../constants/app-constants";
import Button from "../../components/button/button";
import { memo } from "react";
import { useAuth } from "../../context/auth-context";

const TrailerSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleClick = () => {
    {
      navigate(`/${MENUS.NOWSHOWING.ROUTE}`);
    }
  };
  return (
    <section className={styles["trailer-section"]}>
      <h1>{TRAILERS.HEADING}</h1>
      {!user && (
        <p className={styles["sign-in-prmt"]}>
          {TRAILERS.SIGN_IN_PROMPT}{" "}
          <Link to={`/${SESSION.LOGIN.ROUTE}`}>{TRAILERS.SIGN_IN_NOW}</Link>
        </p>
      )}
      <div className={styles["split-container"]}>
        <div className={styles["trailer-img"]}></div>
        <div className={styles["trailer-des"]}>
          <h1>{TRAILERS.TRAILER_TITLE}</h1>
          <p>{TRAILERS.TRAILER_DESC}</p>
          <Button onClick={handleClick} size="lg">
            {TRAILERS.WATCH_NOW}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default memo(TrailerSection);
