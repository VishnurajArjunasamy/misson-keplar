import { FC } from "react";
import styles from "./movie-card.module.scss";
import Img from "../Img/Img";
import ThumbsUp from "../thumbs-up/thumbs-up";

interface MovieCardProps {
  src: string;
}

const MovieCard: FC<MovieCardProps> = ({ src }) => {
  return (
    <div className={styles["movie-card"]}>
      <div className={styles["movie-img"]}>
        <Img src={src} />
      </div>
      <div className={styles["movie-details"]}>
        <div>
          <h2></h2>
          <span></span>
        </div>
        <ThumbsUp onClick={() => {}} />
      </div>
    </div>
  );
};

export default MovieCard;
