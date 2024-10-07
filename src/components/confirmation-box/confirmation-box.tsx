import React from "react";
import styles from "./confirmation-box.module.scss";
import { formatDate, getTimeofDay } from "../../utils/commonUtils";
import { RESERVE } from "../../constants/app.constants";

const { ORDER_CONFIRM } = RESERVE;

interface ConfrimMsgIF {
  tPersons: number;
  resName: string;
  time: string;
  date: string;
}
export default function ConfirmationBox({
  tPersons,
  resName,
  time,
  date,
}: ConfrimMsgIF) {
  return (
    <div className={styles["confirm-box"]}>
      <p className={styles["confirm-txt"]}>
        {ORDER_CONFIRM.STRING_ONE}
        <span className={styles["styled-txt"]}> {tPersons}</span>{" "}
        {ORDER_CONFIRM.STRING_TWO}
        <span className={styles["styled-txt"]}> {resName}</span>{" "}
        {ORDER_CONFIRM.STRING_THREE}
        <span className={styles["styled-txt"]}> {getTimeofDay(time)} </span>
        {ORDER_CONFIRM.STRING_FOUR}
        <span className={styles["styled-txt"]}>
          {formatDate(new Date(date))}
        </span>
        {ORDER_CONFIRM.STRING_FIVE}
      </p>
      <p className={styles["queries-txt"]}>{ORDER_CONFIRM.STRING_SIX}</p>
    </div>
  );
}
