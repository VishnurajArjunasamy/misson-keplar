import { FC, useEffect, useMemo, useRef, useState } from "react";
import { ShortTeasersIF } from "../../modals/teaserModal";
import styles from "./teaser-card.module.scss";
import Video from "../video/video";
import { withAdvertisement } from "../../helper/withAdvertisement";
import PlayPauseBtn from "../video-controls/play-pause-btn/play-pause-btn";
import { SHORT_TEASERS } from "../../constants/app-constants";
import { getRandomShortAd } from "../../utils/adsUtils";

const shortAdDuration = 1;
const videoDuration = 2;

interface TeaserCardProps {
  teaserData: ShortTeasersIF;
}

export const TeaserCard: FC<TeaserCardProps> = withAdvertisement(
  ({ teaserData, timer, startTimer, stopTimer, seconds, setSeconds }) => {
    const [isVideoPlaying, setVideoIsPlaying] = useState(false);
    const [isAdPlaying, setIsAdPlaying] = useState(false);
    const [showTimer, setShowTimer] = useState(false);
    const videoRef = useRef();

    useEffect(() => {
      console.log(seconds);
      if (seconds < 1 && isVideoPlaying == true && isAdPlaying == false) {
        console.log("Start Ad");
        setVideoIsPlaying(false);
        videoRef.current.pause();
        startAdTimer();
      }
      if (seconds < 1 && isVideoPlaying == false && isAdPlaying == true) {
        console.log("Start video");
        setVideoIsPlaying(true);
        videoRef.current.play();
        startVideoTimer();
      }
    }, [seconds, isAdPlaying, isVideoPlaying]);

    /**
     * Strats timer for Video and once the timer is about to finish
     * it executes the callback
     */
    const startVideoTimer = () => {
      setVideoIsPlaying(true);
      setIsAdPlaying(false);
      startTimer(videoDuration, () => {});
    };

    /**
     * Strats timer for Advertisement and once the timer is about to finish
     * it executes the callback
     */
    const startAdTimer = () => {
      setVideoIsPlaying(false);
      setIsAdPlaying(true);
      startTimer(shortAdDuration, () => {});
    };

    /**
     * Toggles between playing and pausing the video
     */
    const toggleVideo = () => {
      if (videoRef.current) {
        setShowTimer(true);
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
        {showTimer && (
          <p className={styles["timer"]}>
            {isAdPlaying
              ? `${SHORT_TEASERS.VIDEO_TXT} ${timer}`
              : `${SHORT_TEASERS.ADVERTISEMENT_TXT} ${timer}`}
          </p>
        )}
      </div>
    );
  }
);
