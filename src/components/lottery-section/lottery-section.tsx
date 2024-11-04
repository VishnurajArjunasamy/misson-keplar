import { ErrorBoundary } from "react-error-boundary";
import LotteryInput from "../lottery-input/lottery-input";
import styles from "./lottery-section.module.scss";
import { memo } from "react";

const LotterySection = () => {
  function fallbackRender({ error }) {
    return <span className={styles["lottery-msg"]}>{error.message}</span>;
  }
  return (
    <section className={styles["lottery-section"]}>
      <ErrorBoundary fallbackRender={fallbackRender}>
        <LotteryInput />
      </ErrorBoundary>
    </section>
  );
};

export default memo(LotterySection);
