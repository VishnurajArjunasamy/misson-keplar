import React from "react";
import styles from "./button.module.scss";

interface ButtonPropsI {
  type: "l" | "sm" | "no-bg";
  name: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ name, type = "l", onClick }: ButtonPropsI) {
  let btnStyle;
  if (type == "l") {
    btnStyle = styles["large-btn"];
  } else if (type == "sm") {
    btnStyle = styles["small-btn"];
  } else {
    btnStyle = styles["no-bg-btn"];
  }
  return (
    <button
      className={`${styles["styled-button"]} ${btnStyle}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
