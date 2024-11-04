import Langbox from "../../components/lang-box/lang-box";
import { OTHER_LANGUAGES } from "../../constants/app-constants";
import styles from "./other-languages.module.scss";

const languages = ["Q", "W", "E", "R", "T"];

const OtherLanguages = () => {
  return (
    <section className={styles["other-lang-container"]}>
      <h1>{OTHER_LANGUAGES.HEADING}</h1>
      <div className={styles["languages"]}>
        {languages.map((lang) => (
          <Langbox lang={lang} />
        ))}
      </div>
    </section>
  );
};

export default OtherLanguages;
