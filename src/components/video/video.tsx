import { FC } from "react";
import styles from "./video.module.scss";
import React from "react";

interface VideoProps {
  src: string;
  poster?: string;
}

const Video: FC<VideoProps> = React.forwardRef(({ src, poster }, ref) => {
  return (
    <video
      src={src}
      poster={poster}
      ref={ref}
      className={styles["video"]}
    ></video>
  );
});

export default Video;
