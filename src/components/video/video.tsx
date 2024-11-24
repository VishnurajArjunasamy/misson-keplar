import styles from "./video.module.scss";
import React, { useImperativeHandle, useRef } from "react";

interface VideoProps {
  src: string;
  poster?: string;
}

interface VideoRefIF {
  play: () => void;
  pause: () => void;
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
