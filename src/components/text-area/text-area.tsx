import { FC } from "react";
import classes from "./text-area.module.scss";

interface TextAreaProps {
  value?: string;
  placeholder?: string;
  name?: string;
}

const TextArea: FC<TextAreaProps> = ({ value, placeholder, name }) => {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      className={classes.textArea}
      name={name}
    ></textarea>
  );
};

export default TextArea;
