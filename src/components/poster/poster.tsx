import React from "react";
import { Poster } from "../../types/restaurantType";
import styles from "./poster.module.scss";

interface Props {
  poster: Poster;
  animationType?: string;
}


export default function PosterRender({ poster, animationType = "" }: Props) {
  return (
    <div className={styles.poster}>
      <img src={poster.imageSrc} />
      <p className={styles[animationType]}>{poster.description}</p>
    </div>
  );
}
