import React, { FC } from "react";
import styles from "./input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: string;
}

const Input: FC<InputProps> = ({
  id,
  type,
  name,
  variant = "plain-inp",
  placeholder,
}) => {
  let style;

  if (variant == "styled-inp") {
    style = `${styles["input"]} ${styles["styled-inp"]}`;
  } else {
    style = `${styles["input"]} ${styles["plain-inp"]}`;
  }
  return (
    <input
      className={style}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
    />
  );
};

export default Input;
