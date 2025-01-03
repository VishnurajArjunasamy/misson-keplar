import { FC, forwardRef, Ref } from "react";
import classes from "./text-area.module.scss";

interface TextAreaProps {
  value?: string;
  placeholder?: string;
  name?: string;
  defaultValue?: string;
  isReadOnly?: boolean;
  ref?: Ref<HTMLTextAreaElement>;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ value, placeholder, name, defaultValue, isReadOnly }, ref) => {
    return (
      <textarea
        value={value}
        placeholder={placeholder}
        className={classes.textArea}
        name={name}
        defaultValue={defaultValue}
        readOnly={isReadOnly}
        ref={ref}
      ></textarea>
    );
  }
);

export default TextArea;
