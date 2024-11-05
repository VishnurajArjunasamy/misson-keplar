import { FC, memo, useRef, useState } from "react";
import { ShortTeasersIF } from "../../modals/teaserModal";
import styles from "./teaser-card.module.scss";
import Video from "../video/video";
import { withAdvertisement } from "../../helper/withAdvertisement";
import playBtn from "../../assets/logos/play-button.png";
import pauseBtn from "../../assets/logos/pause-button.png";
import PlayPauseBtn from "../video-controls/play-pause-btn/play-pause-btn";

interface TeaserCardProps {
  teaserData: ShortTeasersIF;
}

const TeaserCard: FC<TeaserCardProps> = ({ teaserData, timer }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef();
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
    <div className={styles["teaser-card"]}>
      <div className={styles["video-section"]}>
        <Video
          ref={videoRef}
          src={teaserData.videoUrl}
          poster={teaserData.posterImg}
        />
        <div className={styles["pl-ps-logo"]} onClick={toggleVideo}>
          {/* {isPlaying ? <img src={pauseBtn} /> : <img src={playBtn} />} */}
          {isPlaying ? (
            <PlayPauseBtn type="play" />
          ) : (
            <PlayPauseBtn type="pause" />
          )}
        </div>
      </div>
      <h1>{teaserData.movieName}</h1>
      <p>{timer}</p>
    </div>
  );
};

export default memo(withAdvertisement(TeaserCard, 5));
