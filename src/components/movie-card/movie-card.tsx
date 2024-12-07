import { FC } from "react";
import styles from "./movie-card.module.scss";
import Img from "../Img/Img";
import ThumbsUp from "../thumbs-up/thumbs-up";
import { AllMoviesIF } from "../../modals/allMoviesModal";
import { ALL_MOVIES } from "../../constants/app-constants";

interface MovieCardProps {
  movieData: AllMoviesIF;
  handleLike: (id: number) => void;
  onMovieSelect: () => void;
}

const MovieCard: FC<MovieCardProps> = ({
  movieData,
  onMovieSelect,
  handleLike,
}) => {
  return (
    <div className={styles["movie-card"]} data-testid="movie-card">
      <div className={styles["movie-img"]} onClick={onMovieSelect}>
        <Img src={movieData.imgUrl} />
      </div>
      <div className={styles["movie-details"]}>
        <div className={styles["info"]}>
          <h2>{movieData.name}</h2>
          <span>
            {movieData.likes} {ALL_MOVIES.LIKES_TXT}
          </span>
        </div>
        <ThumbsUp
          liked={movieData.liked as boolean}
          onClick={() => handleLike(movieData.id)}
        />
      </div>
    </div>
  );
};

export default MovieCard;
