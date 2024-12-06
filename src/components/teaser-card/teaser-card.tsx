import { FC, useEffect, useMemo, useRef, useState } from "react";
import { NowPlayingIF, TeaserWithIDIF } from "../../modals/teaserModal";
import styles from "./teaser-card.module.scss";
import Video from "../video/video";
import { withAdvertisement } from "../../helper/withAdvertisement";
import PlayPauseBtn from "../video-controls/play-pause-btn/play-pause-btn";
import { SHORT_TEASERS } from "../../constants/app-constants";
import { getRandomShortAd } from "../../utils/adsUtils";
import { VideoRefIF } from "../../modals/videoModal";

const shortAdDuration = 2;
const videoDuration = 5;

interface TeaserCardProps {
  teaserData: TeaserWithIDIF;
  nowPlaying: NowPlayingIF;
  setNowPlaying: React.Dispatch<React.SetStateAction<NowPlayingIF>>;
  timer?: string;
  startTimer?: (duration: number) => void;
  stopTimer?: () => void;
  seconds?: number;
  setSeconds?: React.Dispatch<React.SetStateAction<number | null>>;
}

export const TCard: FC<TeaserCardProps> = ({
  teaserData,
  nowPlaying,
  setNowPlaying,
  timer,
  startTimer,
  stopTimer,
  seconds,
  setSeconds,
}) => {
  const [isVideoPlaying, setVideoIsPlaying] = useState(false);
  const [isAdPlaying, setIsAdPlaying] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const videoRef = useRef<VideoRefIF>(null);
  const isAdPlayedRef = useRef(false);

  useEffect(() => {
    if (!nowPlaying[teaserData.id as keyof NowPlayingIF]) {
      stopTimer();
      videoRef.current?.pause();
      setVideoIsPlaying(false);
      setIsAdPlaying(false);
      setShowTimer(false);
      setSeconds(null);
      isAdPlayedRef.current = false;
      if (nowPlaying[teaserData.id as keyof NowPlayingIF] != null)
        videoRef.current?.load();
    }
  }, [nowPlaying]);

  /**
   * When second becomes less than 1 start and stop video, ads accordingly
   */
  useEffect(() => {
    if (
      seconds <= 0 &&
      isVideoPlaying == true &&
      isAdPlaying == false &&
      isAdPlayedRef.current == false
    ) {
      setVideoIsPlaying(false);
      videoRef.current?.pause();
      startAdTimer();
    }
    if (seconds <= 0 && isVideoPlaying == false && isAdPlaying == true) {
      setVideoIsPlaying(true);
      videoRef.current?.play();
      isAdPlayedRef.current = true;
      stopTimer();
      setShowTimer(false);
      startVideoTimer();
    }
  }, [seconds, isAdPlaying, isVideoPlaying]);

  /***
   * Gets a Random Short size Ad Image only when the isAdPlaying state changed
   * i.e For New add only
   */
  const adImage = useMemo(() => {
    return getRandomShortAd();
  }, [isAdPlaying]);

  /**
   * Strats timer for Video and once the timer is about to finish
   * it executes the callback
   */
  const startVideoTimer = () => {
    setVideoIsPlaying(true);
    setIsAdPlaying(false);
    if (!isAdPlayedRef.current)
      startTimer(seconds > 0 ? seconds : videoDuration);
  };

  /**
   * Strats timer for Advertisement and once the timer is about to finish
   * it executes the callback
   */
  const startAdTimer = () => {
    setVideoIsPlaying(false);
    setIsAdPlaying(true);
    startTimer(shortAdDuration);
  };

  /**
   * Toggles between playing and pausing the video
   */
  const toggleVideo = () => {
    setNowPlaying((prev: NowPlayingIF) => {
      return Object.keys(prev).reduce((toggledObj: NowPlayingIF, key) => {
        toggledObj[key as keyof NowPlayingIF] = key == teaserData.id;
        return toggledObj;
      }, {} as NowPlayingIF);
    });

    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        stopTimer();
        setVideoIsPlaying(false);
      } else {
        videoRef.current.play();
        if (isAdPlayedRef.current == false) {
          setShowTimer(true);
        }
        startVideoTimer();
      }
    }
  };

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
};

export const TeaserCard = withAdvertisement(TCard);
