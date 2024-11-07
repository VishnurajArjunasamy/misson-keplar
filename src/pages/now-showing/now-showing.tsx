import Video from "../../components/video/video";
import { NOW_SHOWING, TRAILERS } from "../../constants/app-constants";
import { MOVIE_URL } from "../../constants/url-constants";
import MOVIE_POSTER_URL from "../../assets/images/sindel-background.png";
import styles from "./now-showing.module.scss";
import { useRef, useState } from "react";
import PlayPauseBtn from "../../components/video-controls/play-pause-btn/play-pause-btn";

const NowShowing = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef();

  const videoBtn = isPlaying ? (
    <PlayPauseBtn type="pause" />
  ) : (
    <PlayPauseBtn type="play" />
  );

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying((prev) => !prev);
    }
  };
  return (
    <section className={styles["now-showing"]}>
      <div className={styles["content"]}>
        <h2 className={styles["title"]}>{NOW_SHOWING.HEADING}</h2>
        <div className={styles["video-container"]}>
          <h1>{TRAILERS.TRAILER_TITLE}</h1>
          <div className={styles["video-section"]}>
            <Video src={MOVIE_URL} poster={MOVIE_POSTER_URL} ref={videoRef} />
            <div className={styles["controls"]} onClick={toggleVideo}>
              {videoBtn}
            </div>
          </div>
          <p>{TRAILERS.TRAILER_DESC}</p>
        </div>
      </div>
    </section>
  );
};

export default NowShowing;
