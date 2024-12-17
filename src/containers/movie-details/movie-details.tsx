import { FC, memo } from "react";
import styles from "./movie-details.module.scss";
import ThumbsUp from "../../components/thumbs-up/thumbs-up";
import { ALL_MOVIES } from "../../constants/app-constants";
import Img from "../../components/Img/Img";
import { AllMoviesIF } from "../../modals/allMoviesModal";
interface MovieDetailsProps {
  selectedMovie: AllMoviesIF | undefined;
  handleLike: (id: number) => void;
  liked: boolean | undefined;
  likes: number | undefined;
}

const MovieDetails: FC<MovieDetailsProps> = ({
  selectedMovie,
  handleLike,
  liked,
  likes,
}) => {

  return (
    <section className={styles["movies-desc-container"]}>
      <div className={styles["title"]}>
        <h1>{selectedMovie?.name}</h1>
        <div
          className={styles["thumbs-up"]}
          onClick={() => handleLike(selectedMovie?.id as number)}
        >
          <ThumbsUp data-testid="thumbs-up" liked={liked} />
        </div>
      </div>
      <h2
        className={styles["likes-txt"]}
      >{`${likes} ${ALL_MOVIES.LIKES_TXT}`}</h2>
      <div className={styles["movie-img"]}>
        <Img data-testid="image-poster" src={selectedMovie?.imgUrl as string} />
      </div>
      <p className={styles["movie-desc"]}>{selectedMovie?.description}</p>
      <div className={styles["actors-section"]}>
        <h1>{ALL_MOVIES.ACTORS_TXT}</h1>
        {selectedMovie?.actors.map((actor) => (
          <span className={styles["actor-txt"]} key={actor}>
            {actor}
          </span>
        ))}
      </div>
    </section>
  );
};

export default memo(MovieDetails);
