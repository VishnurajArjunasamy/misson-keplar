import React from "react";
import styles from "./split-container.module.scss";

interface SplitContainerPropsI {
  leftContainer: React.ReactNode;
  rightContainer: React.ReactNode;
  isEmptyCart: boolean;
}

export default function SplitContainer({
  leftContainer,
  rightContainer,
  isEmptyCart = true,
}: SplitContainerPropsI) {
  return (
    <div className={styles["split-section"]}>
      <section className={styles["left-section"]}>{leftContainer}</section>
      {!isEmptyCart && (
        <section className={styles["right-section"]}>{rightContainer}</section>
      )}
    </div>
  );
}
