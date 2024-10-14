import React from "react";
import styles from "./guarantee.module.scss";
import shield from "../../assets/logos/shield .png";

interface GuaranteePropsI {
  years: number;
}

export default function Guarantee({ years = 0 }: GuaranteePropsI) {
  const yearPlural = years <= 1 ? "YEAR" : "YEARS";
  return (
    <div className={styles["guarantee-box"]}>
      <img src={shield} />
      <p>
        {years} {yearPlural} GUARANTEE
      </p>
    </div>
  );
}
