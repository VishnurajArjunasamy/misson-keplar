import { FC } from "react";
import classes from "./text-area.module.scss";

interface TextAreaProps {
  value?: string;
  placeholder?: string;
  name?: string;
  defaultValue?: string;  
  isReadOnly?: boolean;
}

const TextArea: FC<TextAreaProps> = ({
  value,
  placeholder,
  name,
  defaultValue,
  isReadOnly
}) => {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      className={classes.textArea}
      name={name}
      defaultValue={defaultValue}
      readOnly={isReadOnly}
    ></textarea>
  );
};

export default TextArea;
