import { FC } from "react";
import classes from "./button.module.scss";

interface ButtonProps {
  onClick?: () => void;
  label: string;
  type?: "button" | "submit" | "reset";
}

const Button: FC<ButtonProps> = ({ onClick, label, type }) => {
  return (
    <button type={type} onClick={onClick} className={classes.button}>
      {label}
    </button>
  );
};

export default Button;
