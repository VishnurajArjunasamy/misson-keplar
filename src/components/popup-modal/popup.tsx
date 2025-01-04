import React, { FC } from "react";
import classes from "./popup.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { POPUP } from "../../constants/app.constants";
import Button from "../button/button";

interface PopupProps {
  closeModal?: () => void;
}

const PopUp: FC<PopupProps> = ({ closeModal }) => {
  const isDark = useSelector((state: RootState) => state.sideBar.isDarkMode);

  function handleModalClose() {
    closeModal && closeModal();
  }

  const style = `${classes.popUp} ${isDark ? classes.dark : classes.light}`;

  return (
    <div className={style}>
      <div className={classes.content} onClick={(e) => e.stopPropagation()}>
        <div className={classes.close} onClick={handleModalClose}>
          {POPUP.CLOSE_SYMBOL}
        </div>
        <p>{POPUP.ALERT_MSG}</p>
        <div className={classes.buttons}>
          <div className={classes.button}>
            <Button onClick={handleModalClose} label={POPUP.YES} />
          </div>
          <div className={classes.button}>
            <Button onClick={handleModalClose} label={POPUP.NO} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
