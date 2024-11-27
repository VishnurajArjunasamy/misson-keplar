import { VideoRefIF } from "../../modals/videoModal";
import styles from "./video.module.scss";
import React, { useImperativeHandle, useRef } from "react";

interface VideoProps {
  src: string;
  poster?: string;
}

const Video = React.forwardRef<VideoRefIF, VideoProps>(
  ({ src, poster }, ref) => {
    const videoElementRef = useRef<HTMLVideoElement | null>(null);

    useImperativeHandle(ref, () => ({
      play: () => {
        videoElementRef.current?.play();
      },
      pause: () => {
        videoElementRef.current?.pause();
      },
      currentTime: videoElementRef.current?.currentTime,
      resetTime: () => {
        if (videoElementRef != null) {
          videoElementRef.current.currentTime = 0;
        }
      },
    }));

    return (
      <video
        src={src}
        poster={poster}
        ref={videoElementRef}
        className={styles["video"]}
      ></video>
    );
  }
);

export default Video;
