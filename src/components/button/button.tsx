import { FC } from "react";
import classes from "./button.module.scss";

interface ButtonProps {
  onClick?: () => void;
  label: string;
  type?: "button" | "submit" | "reset";
}

const Button: FC<ButtonProps> = ({ onClick, label,type }) => {
  return (
    <button onClick={onClick} className={classes.button} type={type}>
      {label}
    </button>
  );
};

export default Button;
