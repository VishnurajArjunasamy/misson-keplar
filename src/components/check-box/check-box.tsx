import React, { FC } from "react";
import classes from "./check-box.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface CheckBoxProps {
  label: string;
  value: boolean;
  handleChange: () => void;
}

const CheckBox: FC<CheckBoxProps> = ({ label, value, handleChange }) => {
  const isDark = useSelector((state: RootState) => state.sideBar.isDarkMode);

  const style = `${classes.checkBoxWrapper} ${
    isDark ? classes.dark : classes.light
  }`;
  return (
    <div className={style}>
      <input
        id={label}
        type="checkbox"
        checked={value}
        onChange={handleChange}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CheckBox;
