import { FC } from "react";
import classes from "./button.module.scss";

interface ButtonProps {
  onClick?: () => void;
  label: string;
  type?: "button" | "submit" | "reset";
  testid?: string;
}

const Button: FC<ButtonProps> = ({
  onClick,
  label,
  type = "button",
  testid,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classes.button}
      data-testid={testid}
    >
      {label}
    </button>
  );
};

export default Button;
