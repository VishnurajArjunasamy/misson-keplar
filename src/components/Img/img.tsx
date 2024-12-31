import { FC } from "react";
import classes from "./img.module.scss";

interface ImgProps {
  src: string;
  alt?: string;
}

const Img: FC<ImgProps> = ({ src, alt = "image" }) => {
  return <img src={src} alt={alt} className={classes.img} />;
};

export default Img;
