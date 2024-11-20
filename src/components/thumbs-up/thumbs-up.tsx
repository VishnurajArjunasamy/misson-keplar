import { FC } from "react";
import thumbsUp from "../../assets/logos/thumb-up.png";
import styles from "./thumbs-up.module.scss";

interface ThumbsUpProps {
  onClick?: () => void;
}

const ThumbsUp: FC<ThumbsUpProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className={styles["thumbs-up"]}>
      <img src={thumbsUp} />
    </div>
  );
};

export default ThumbsUp;
