import { FC } from "react";
import classes from "./img.module.scss";
import emptyUser from "../../assets/images/empty-user.png";
import placeHolderBlogImg from "../../assets/images/placeholder-image.jpg";
interface ImgProps {
  src: string | undefined;
  alt?: string;
  isUser?: boolean;
}

const Img: FC<ImgProps> = ({ src, alt = "image", isUser }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={classes.img}
      onError={(e) => {
        e.currentTarget.onerror = null;
        if (isUser) {
          e.currentTarget.src = emptyUser;
        } else {
          e.currentTarget.src = placeHolderBlogImg;
        }
      }}
    />
  );
};

export default Img;
