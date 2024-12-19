import { FC } from "react";

interface ImgProps {
  src: string;
  alt?: string;
}

const Img: FC<ImgProps> = ({ src, alt = "image" }) => {
  return <img src={src} alt={alt} />;
};

export default Img;
