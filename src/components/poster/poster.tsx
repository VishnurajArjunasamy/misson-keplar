import React from "react";
import { Poster } from "../../types/restaurantType";
import styles from "./poster.module.scss";

interface Props {
  poster: Poster;
}

export default function PosterRender({ poster }: Props) {
  return (
    <div className={styles.poster}>
      <img src={poster.imageSrc} />
      <p>{poster.description}</p>
    </div>
  );
}
