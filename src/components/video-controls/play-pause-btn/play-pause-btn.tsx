import { FC } from "react";
import styles from "./play-pause-btn.module.scss";
import pauseBtn from "../../../assets/logos/pause-button.png";

interface PlayPauseBtnProps {
  type: "play" | "pause";
  onClick?: () => void;
}

const PlayPauseBtn: FC<PlayPauseBtnProps> = ({ type, onClick }) => {
  let icon;
  if (type === "play") {
    icon = <i className={styles["play-icon"]}></i>;
  } else {
    icon = (
      <i className={styles["pause-icon"]}>
        <img src={pauseBtn} />
      </i>
    );
  }
  return (
    <div className={styles["outer-circle"]} onClick={onClick}>
      {icon}
    </div>
  );
};

export default PlayPauseBtn;
