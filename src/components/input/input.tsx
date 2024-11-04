import React, { FC } from "react";
import styles from "./input.module.scss";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({ id, type, name }) => {
  return <input className={styles["input"]} type={type} id={id} name={name} />;
};

export default Input;
