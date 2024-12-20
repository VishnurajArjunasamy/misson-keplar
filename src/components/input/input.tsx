import { FC } from "react";
import classes from "./input.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface inputProps {
  type: string;
  value: string | null;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<inputProps> = ({ type, value, placeholder, onChange }) => {
  const isDark = useSelector((state: RootState) => state.sideBar.isDarkMode);
  const style = `${classes.input} ${isDark ? classes.dark : classes.light}`;
  return (
    <input
      type={type}
      onChange={onChange}
      value={value || ""}
      className={style}
      placeholder={placeholder}
    />
  );
};

export default Input;
