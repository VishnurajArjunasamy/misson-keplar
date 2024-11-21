import Langbox from "../../components/lang-box/lang-box";
import { OTHER_LANGUAGES } from "../../constants/app-constants";
import styles from "./other-languages.module.scss";

const OtherLanguages = () => {
  return (
    <section className={styles["other-lang-container"]}>
      <h1>{OTHER_LANGUAGES.HEADING}</h1>
      <div className={styles["languages"]}>
        {OTHER_LANGUAGES.SYMBOLS.map((lang, idx) => (
          <Langbox lang={lang} key={idx} />
        ))}
      </div>
    </section>
  );
};

export default OtherLanguages;
