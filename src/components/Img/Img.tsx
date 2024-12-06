import { FC } from "react";
import styles from "./Img.module.scss";
import emptyImage from "../../assets/images/empty-image.png";

interface ImgProps {
  src: string;
}

const Img: FC<ImgProps> = ({ src, ...props }) => {
  return (
    <img
      src={src}
      alt={"Movie"}
      className={styles["img-style"]}
      onError={(e) => {
        e.currentTarget.src = emptyImage;
        console.log("err");
      }}
      {...props}
    />
  );
};

export default Img;
