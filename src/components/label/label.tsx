import styles from "./label.module.scss";

interface LabelProps {
  htmlFor: string;
  name: string;
}

const Label = ({ name, htmlFor }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={styles["label"]}>
      {name}
    </label>
  );
};

export default Label;
