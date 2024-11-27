import { FC } from "react";
import thumbsUp from "../../assets/logos/thumb-up.png";
import thumbsLiked from "../../assets/logos/thumb-up-liked.png";
import styles from "./thumbs-up.module.scss";

interface ThumbsUpProps {
  onClick?: () => void;
  liked?: boolean;
}

const ThumbsUp: FC<ThumbsUpProps> = ({ onClick, liked }) => {
  return (
    <div onClick={onClick} className={styles["thumbs-up"]}>
      {liked ? <img src={thumbsLiked} /> : <img src={thumbsUp} />}
    </div>
  );
};

export default ThumbsUp;
