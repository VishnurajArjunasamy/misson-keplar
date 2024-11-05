import { FC } from "react";
import styles from "./play-pause-btn.module.scss";
import pauseBtn from "../../../assets/logos/pause-button.png";

interface PlayPauseBtnProps {
  type: "play" | "pause";
}

const PlayPauseBtn: FC<PlayPauseBtnProps> = ({ type }) => {
  let icon;
  if (type === "play") {
    icon = (
      <i className={styles["pause-icon"]}>
        <img src={pauseBtn} />
      </i>
    );
  } else {
    icon = <i className={styles["play-icon"]}></i>;
  }
  return <div className={styles["outer-circle"]}>{icon}</div>;
};

export default PlayPauseBtn;
