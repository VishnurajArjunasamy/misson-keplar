import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NowPlayingIF, TeaserWithIDIF } from "../../modals/teaserModal";
import styles from "./teaser-card.module.scss";
import { withAdvertisement } from "../../helper/withAdvertisement";
import { getRandomShortAd } from "../../utils/adsUtils";
import { VideoRefIF } from "../../modals/videoModal";
import TimerCard from "../timer-card/timer-card";
import VideoWithAd from "../video-wtih-ad/video-with-ad";

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
  startTimer = () => {},
  stopTimer = () => {},
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
  const toggleVideo = useCallback(() => {
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
  }, [isVideoPlaying, teaserData.id]);

  return (
    <div className={styles["teaser-card"]}>
      {
        <VideoWithAd
          isVideoPlaying={isVideoPlaying}
          teaserData={teaserData}
          isAdPlaying={isAdPlaying}
          adImage={adImage}
          videoRef={videoRef}
          toggleVideo={toggleVideo}
        />
      }
      <TimerCard
        showTimer={showTimer}
        isAdPlaying={isAdPlaying}
        timer={timer}
        
      />
    </div>
  );
};

export const TeaserCard = withAdvertisement(TCard);
