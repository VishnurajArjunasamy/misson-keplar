import { FC, memo, useEffect } from "react";
import styles from "./movies-desc-container.module.scss";
import { AllMoviesIF } from "../../modals/allMoviesModal";
import ThumbsUp from "../../components/thumbs-up/thumbs-up";
import Img from "../../components/Img/Img";
import { ALL_MOVIES } from "../../constants/app-constants";
import { withAdvertisement } from "../../helper/withAdvertisement";

interface MoviesDescContainerProps {
  selectedMovie: AllMoviesIF | undefined;
}

const MoviesDescContainer: FC<MoviesDescContainerProps> = ({
  selectedMovie,
  timer,
  startTimer,
  stopTimer,
  seconds,
}) => {
  useEffect(() => {
    stopTimer()
    startTimer(10);
    console.log(selectedMovie);
    
  }, [selectedMovie]);

  const actorsContainer = (
    <div className={styles["actors-section"]}>
      <h1>{ALL_MOVIES.ACTORS_TXT}</h1>
      {selectedMovie?.actors.map((actor) => (
        <span className={styles["actor-txt"]} key={actor}>
          {actor}
        </span>
      ))}
    </div>
  );

  return (
    <section className={styles["movies-desc-container"]}>
      <div className={styles["title"]}>
        <h1>{selectedMovie?.name}</h1>
        <div className={styles["thumbs-up"]}>
          <ThumbsUp onClick={() => {}} />
        </div>
      </div>
      <h2
        className={styles["likes-txt"]}
      >{`${selectedMovie?.likes} ${ALL_MOVIES.LIKES_TXT}`}</h2>
      <div className={styles["movie-img"]}>
        <Img src={selectedMovie?.imgUrl} />
      </div>
      <p className={styles["movie-desc"]}>{selectedMovie?.description}</p>
      {actorsContainer}
      <>{timer}</>
    </section>
  );
};

export default memo(withAdvertisement(MoviesDescContainer));
