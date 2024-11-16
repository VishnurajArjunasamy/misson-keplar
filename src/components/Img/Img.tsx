import { FC } from "react";
import styles from "./Img.module.scss";

interface ImgProps {
  src: string;
}

const Img: FC<ImgProps> = ({ src }) => {
  return <img src={src} className={styles['img-style']}/>;
};

export default Img;
