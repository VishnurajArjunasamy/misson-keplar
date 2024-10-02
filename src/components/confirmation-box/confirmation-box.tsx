import React from "react";
import styles from "./confirmation-box.module.scss";
import { formatDate, getTimeofDay } from "../../utils/commonUtils";

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
        We have reserved a table for
        <span className={styles["styled-txt"]}> {tPersons}</span> at the
        <span className={styles["styled-txt"]}> {resName}</span> for the
        <span className={styles["styled-txt"]}> {getTimeofDay(time)} </span>
        of{" "}
        <span className={styles["styled-txt"]}>
          {formatDate(new Date(date))}
        </span>
        . You will receive an email and a text message with the details.
      </p>
      <p className={styles["queries-txt"]}>
        For cancellation or further queries contact contact the restaurants{" "}
      </p>
    </div>
  );
}
