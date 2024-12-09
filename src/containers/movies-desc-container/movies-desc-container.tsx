import { FC, memo, useEffect, useMemo, useRef, useState } from "react";
import styles from "./movies-desc-container.module.scss";
import { AllMoviesIF } from "../../modals/allMoviesModal";
import {  SHORT_TEASERS } from "../../constants/app-constants";
import { withAdvertisement } from "../../helper/withAdvertisement";
import { getRandomLongAd } from "../../utils/adsUtils";
import TimerCard from "../../components/timer-card/timer-card";
import MovieDetails from "../movie-details/movie-details";

const longAdDuration = 5;
const infoDuration = 15;

interface MoviesDescContainerProps {
  movies: AllMoviesIF[] | undefined;
  selectedMovie: AllMoviesIF | undefined;
  handleLike: (id: number) => void;
  timer?: string;
  startTimer?: (duration: number) => void;
  stopTimer?: () => void;
  seconds?: number;
  setSeconds?: React.Dispatch<React.SetStateAction<number | null>>;
}

const MoviesDescContainer: FC<MoviesDescContainerProps> = ({
  selectedMovie,
  movies,
  handleLike,
  timer,
  startTimer = () => {},
  stopTimer = () => {},
  seconds,
}) => {
  const [isInfoShowing, setIsInfoShwoing] = useState(true);
  const [isAdPlaying, setIsAdPlaying] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const isAdPlayedRef = useRef(false);
  let movieDesContainer;

  // Initially Start the Timer to display Ad after selectedMovie changes
  useEffect(() => {
    stopTimer();
    showInfo();
    setIsInfoShwoing(true);
    setIsAdPlaying(false);
    setShowTimer(true);
    isAdPlayedRef.current = false;
  }, [selectedMovie]);

  //Start Stop Ad if the seconds reach 0
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
  const liked = movies?.find((movie) => movie.id == selectedMovie?.id)?.liked;

  if (!isAdPlaying && isInfoShowing) {
    movieDesContainer = (
      <div className={styles["movie-timer-wrapper"]}>
        <MovieDetails
          liked={liked}
          likes={likes}
          selectedMovie={selectedMovie}
          handleLike={handleLike}
        />
        <TimerCard
          showTimer={showTimer}
          isAdPlaying={isAdPlaying}
          timer={timer}
          hasVideo={false}
        />
      </div>
    );
  }

  return movieDesContainer;
};

export default memo(withAdvertisement(MoviesDescContainer));
