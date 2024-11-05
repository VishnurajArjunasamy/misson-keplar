import { FC, useMemo, useRef, useState } from "react";
import { ShortTeasersIF } from "../../modals/teaserModal";
import styles from "./teaser-card.module.scss";
import Video from "../video/video";
import { withAdvertisement } from "../../helper/withAdvertisement";
import PlayPauseBtn from "../video-controls/play-pause-btn/play-pause-btn";
import { SHORT_TEASERS } from "../../constants/app-constants";
import { getRandomShortAd } from "../../utils/adsUtils";

const shortAdDuration = 2;
const videoDuration = 3;

interface TeaserCardProps {
  teaserData: ShortTeasersIF;
}

export const TeaserCard: FC<TeaserCardProps> = withAdvertisement(
  ({ teaserData, timer, startTimer, stopTimer }) => {
    const [isVideoPlaying, setVideoIsPlaying] = useState(false);
    const [isAdPlaying, setIsAdPlaying] = useState(false);
    const videoRef = useRef();

    /**
     * Strats timer for Video and once the timer is about to finish
     * it executes the callback
     */
    const startVideoTimer = () => {
      setVideoIsPlaying(true);
      setIsAdPlaying(false);
      startTimer(videoDuration, () => {
        setVideoIsPlaying(false);
        videoRef.current.pause();
        startAdTimer();
      });
    };

    /**
     * Strats timer for Advertisement and once the timer is about to finish
     * it executes the callback
     */
    const startAdTimer = () => {
      setVideoIsPlaying(false);
      setIsAdPlaying(true);
      startTimer(shortAdDuration, () => {
        setVideoIsPlaying(true);
        videoRef.current.play();
        startVideoTimer();
      });
    };

    // const handlePlayVideo = () => {
    //   setVideoIsPlaying(true);
    //   if (videoRef.current) {
    //     videoRef.current.play();
    //     startVideoTimer();
    //   }
    // };

    /**
     * Toggles between playing and pausing the video
     */
    const toggleVideo = () => {
      if (videoRef.current) {
        if (isVideoPlaying) {
          videoRef.current.pause();
          stopTimer();
          setVideoIsPlaying(false);
        } else {
          videoRef.current.play();
          startVideoTimer();
        }
      }
    };

    /***
     * Gets a Random Short size Ad Image only when the isAdPlaying state changed
     * i.e For New add only
     */
    const adImage = useMemo(() => {
      return getRandomShortAd();
    }, [isAdPlaying]);

    const videoBtn = isVideoPlaying ? (
      <PlayPauseBtn type="pause" />
    ) : (
      <PlayPauseBtn type="play" />
    );

    return (
      <div className={styles["teaser-card"]}>
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
        <p className={styles["timer"]}>
          {isAdPlaying
            ? `${SHORT_TEASERS.VIDEO_TXT} ${timer}`
            : `${SHORT_TEASERS.ADVERTISEMENT_TXT} ${timer}`}
        </p>
      </div>
    );
  }
);
