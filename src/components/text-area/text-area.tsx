import { FC } from "react";
import classes from "./text-area.module.scss";

interface TextAreaProps {
  value?: string;
  placeholder?: string;
}

const TextArea: FC<TextAreaProps> = ({ value, placeholder }) => {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      className={classes.textArea}
    ></textarea>
  );
};

export default TextArea;
