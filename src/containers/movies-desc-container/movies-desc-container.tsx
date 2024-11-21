import { FC, memo, useEffect, useMemo, useRef, useState } from "react";
import styles from "./movies-desc-container.module.scss";
import { AllMoviesIF } from "../../modals/allMoviesModal";
import ThumbsUp from "../../components/thumbs-up/thumbs-up";
import Img from "../../components/Img/Img";
import { ALL_MOVIES, SHORT_TEASERS } from "../../constants/app-constants";
import { withAdvertisement } from "../../helper/withAdvertisement";
import { getRandomLongAd } from "../../utils/adsUtils";

const longAdDuration = 5;
const infoDuration = 15;

interface MoviesDescContainerProps {
  movies: AllMoviesIF[] | undefined;
  selectedMovie: AllMoviesIF | undefined;
  handleLike: (id: number) => void;
}

const MoviesDescContainer: FC<MoviesDescContainerProps> = ({
  selectedMovie,
  movies,
  handleLike,
  timer,
  startTimer,
  stopTimer,
  seconds,
}) => {
  const [isInfoShowing, setIsInfoShwoing] = useState(true);
  const [isAdPlaying, setIsAdPlaying] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const isAdPlayedRef = useRef(false);
  let movieDesContainer;

  useEffect(() => {
    stopTimer();
    showInfo();
    setIsInfoShwoing(true);
    setIsAdPlaying(false);
    setShowTimer(true);
    isAdPlayedRef.current = false;
  }, [selectedMovie]);

  useEffect(() => {
    if (
      seconds != null &&
      seconds < 1 &&
      isInfoShowing &&
      !isAdPlaying &&
      isAdPlayedRef
    ) {
      setIsInfoShwoing(false);
      showAd();
    }
    if (seconds != null && seconds < 1 && !isInfoShowing && isAdPlayedRef) {
      showInfo();
      setShowTimer(false);
      stopTimer();
    }
  }, [seconds]);

  function showInfo() {
    setIsInfoShwoing(true);
    setIsAdPlaying(false);
    if (!isAdPlayedRef.current) {
      return startTimer(infoDuration);
    }
  }

  function showAd() {
    setIsAdPlaying(true);
    setIsInfoShwoing(false);
    startTimer(longAdDuration);
  }
  /***
   * Gets a Random Short size Ad Image only when the isAdPlaying state changed
   * i.e For New add only
   */
  const adImage = useMemo(() => {
    return getRandomLongAd();
  }, [selectedMovie?.id]);

  if (isAdPlaying && !isInfoShowing) {
    console.log("ffff");

    movieDesContainer = (
      <section className={styles["long-ad-container"]}>
        <div className={styles["long-ad-image"]}>
          <img src={adImage} />
        </div>
        {showTimer && (
          <p className={styles["timer"]}>
            {`${SHORT_TEASERS.ADVERTISEMENT_TXT} ${timer}`}
          </p>
        )}
      </section>
    );
  }

  const likes = movies?.find((movie) => movie.id == selectedMovie?.id)?.likes;

  if (!isAdPlaying && isInfoShowing) {
    movieDesContainer = (
      <section className={styles["movies-desc-container"]}>
        <div className={styles["title"]}>
          <h1>{selectedMovie?.name}</h1>
          <div
            className={styles["thumbs-up"]}
            onClick={() => handleLike(selectedMovie?.id)}
          >
            <ThumbsUp />
          </div>
        </div>
        <h2
          className={styles["likes-txt"]}
        >{`${likes} ${ALL_MOVIES.LIKES_TXT}`}</h2>
        <div className={styles["movie-img"]}>
          <Img src={selectedMovie?.imgUrl} />
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
        {showTimer && (
          <p className={styles["timer"]}>
            {`${SHORT_TEASERS.ADVERTISEMENT_TXT} ${timer}`}
          </p>
        )}
      </section>
    );
  }

  return movieDesContainer;
};

export default memo(withAdvertisement(MoviesDescContainer));
