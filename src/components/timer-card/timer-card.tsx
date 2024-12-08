import React, { FC, memo } from "react";
import { SHORT_TEASERS } from "../../constants/app-constants";
import styles from "./timer-card.module.scss";

interface TimercardProps {}

const TimerCard: FC<TimercardProps> = ({ showTimer, isAdPlaying, timer }) => {
  return (
    showTimer && (
      <p className={styles["timer"]}>
        {isAdPlaying
          ? `${SHORT_TEASERS.VIDEO_TXT} ${timer}`
          : `${SHORT_TEASERS.ADVERTISEMENT_TXT} ${timer}`}
      </p>
    )
  );
};

export default memo(TimerCard);
