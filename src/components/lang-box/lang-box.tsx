import { FC } from "react";
import styles from "./lang-box.module.scss";

interface LangboxProps {
  lang: string;
}

const Langbox: FC<LangboxProps> = ({ lang }) => {
  return (
    <div className={styles["lang-box"]}>
      <span>{lang}</span>
    </div>
  );
};

export default Langbox;
