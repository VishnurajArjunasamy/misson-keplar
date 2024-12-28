import { FC } from "react";
import classes from "./button.module.scss";

interface ButtonProps {
  onClick?: () => void;
  label: string;
}

const Button: FC<ButtonProps> = ({ onClick, label }) => {
  return (
    <button onClick={onClick} className={classes.button}>
      {label}
    </button>
  );
};

export default Button;
