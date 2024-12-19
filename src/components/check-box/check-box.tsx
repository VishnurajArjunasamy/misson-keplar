import React, { FC } from "react";
import classes from "./check-box.module.scss";

interface CheckBoxProps {
  label: string;
  value: boolean;
  handleChange: () => void;
}

const CheckBox: FC<CheckBoxProps> = ({ label, value = true, handleChange }) => {
  return (
    <div className={classes.checkBoxWrapper}>
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
