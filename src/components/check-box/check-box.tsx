import React, { FC } from "react";
import classes from "./check-box.module.scss";

interface CheckBoxProps {
  label: string;
  value: boolean;
  handleChange: () => void;
}

const CheckBox: FC<CheckBoxProps> = ({ label, value = true, handleChange }) => {
  return (
    <label className={classes.label}>
      {label}
      <input type="checkbox" checked={value} onChange={handleChange} />
    </label>
  );
};

export default CheckBox;
