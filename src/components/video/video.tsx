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
      load: () => videoElementRef.current?.load()
    }));

    return (
      <video
        src={src}
        poster={poster}
        ref={videoElementRef}
        className={styles["video"]}
        data-testid='video-element'
      ></video>
    );
  }
);

export default Video;
