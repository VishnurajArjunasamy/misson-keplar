import { FC } from "react";
import styles from "./button.module.scss";

interface ButtonProps {
  children: string;
  size: "lg" | "sm";
}

const Button: FC<ButtonProps> = ({ children, size }) => {
  const style =
    size == "lg"
      ? `${styles["styled-btn"]} ${styles["lg-btn"]}`
      : `${styles["styled-btn"]} ${styles["sm-btn"]}`;
  return <button className={style}>{children}</button>;
};

export default Button;
