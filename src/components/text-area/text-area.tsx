import { forwardRef, Ref } from "react";
import classes from "./text-area.module.scss";

interface TextAreaProps {
  value?: string;
  placeholder?: string;
  name?: string;
  defaultValue?: string;
  isReadOnly?: boolean;
  ref?: Ref<HTMLTextAreaElement>;
  onChange?: () => void;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ value, placeholder, name, defaultValue, isReadOnly, onChange }, ref) => {
    return (
      <textarea
        value={value}
        placeholder={placeholder}
        className={classes.textArea}
        name={name}
        defaultValue={defaultValue}
        readOnly={isReadOnly}
        ref={ref}
        onChange={onChange}
      ></textarea>
    );
  }
);

export default TextArea;
