import { FC, memo, useRef, useState } from "react";
import { ShortTeasersIF } from "../../modals/teaserModal";
import styles from "./teaser-card.module.scss";
import Video from "../video/video";

interface TeaserCardProps {
  teaserData: ShortTeasersIF;
}

const TeaserCard: FC<TeaserCardProps> = ({ teaserData }) => {
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
          {isPlaying ? "Pause" : "Play"}
        </div>
      </div>
      <h1>{teaserData.movieName}</h1>
    </div>
  );
};

export default memo(TeaserCard);
