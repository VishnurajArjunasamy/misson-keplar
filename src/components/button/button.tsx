import { FC } from "react";
import styles from "./button.module.scss";

interface ButtonProps {
  children: string;
  size: "lg" | "sm";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({ children, size, onClick }) => {
  const style = size == "lg" ? styles["lg-btn"] : styles["sm-btn"];
  return (
    <button onClick={onClick} className={style}>
      {children}
    </button>
  );
};

export default Button;
