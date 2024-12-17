import React, { FC, memo } from "react";
import Video from "../video/video";
import PlayPauseBtn from "../video-controls/play-pause-btn/play-pause-btn";
import styles from "./video-with-ad.module.scss";
import { TeaserWithIDIF } from "../../modals/teaserModal";
import { VideoRefIF } from "../../modals/videoModal";

interface VideoWithAdProps {
  isVideoPlaying: boolean;
  teaserData: TeaserWithIDIF;
  isAdPlaying: boolean;
  adImage: string;
  videoRef: React.RefObject<VideoRefIF>;
  toggleVideo: () => void;
}

const VideoWithAd: FC<VideoWithAdProps> = ({
  isVideoPlaying,
  teaserData,
  isAdPlaying,
  adImage,
  videoRef,
  toggleVideo,
}) => {
  const videoBtn = isVideoPlaying ? (
    <PlayPauseBtn type="pause" />
  ) : (
    <PlayPauseBtn type="play" />
  );

  return (
    <>
      <div className={styles["video-section"]}>
        <Video
          ref={videoRef}
          src={teaserData.videoUrl}
          poster={teaserData.posterImg}
        />
        {isAdPlaying && (
          <div className={styles["ad-poster"]}>{<img src={adImage} />}</div>
        )}
        {!isAdPlaying && (
          <div className={styles["pl-ps-logo"]} onClick={toggleVideo}>
            {videoBtn}
          </div>
        )}
      </div>
      <h1>{teaserData.movieName}</h1>
    </>
  );
};

export default memo(VideoWithAd);
