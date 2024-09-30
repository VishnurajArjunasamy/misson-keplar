import React from "react";
import star from "../../assets/images/star.png";
import styles from "./rating.module.scss";

interface PropsIF {
  rating: number | undefined;
}

export default function Rating({ rating }: PropsIF) {
  let ratingQuality;

  if (rating > 4) {
    ratingQuality = `${styles["green"]} ${styles["rating"]}`;
  } else if (rating > 3) {
    ratingQuality = `${styles["orange"]} ${styles["rating"]}`;
  } else {
    ratingQuality = `${styles["red"]} ${styles["rating"]}`;
  }
  return (
    <div className={ratingQuality}>
      <p>{rating ? rating : 0}</p>
      <i>
        <img src={star} />
      </i>
    </div>
  );
}
