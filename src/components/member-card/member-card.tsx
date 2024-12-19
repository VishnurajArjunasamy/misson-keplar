import { FC } from "react";
import Img from "../Img/img";

interface MemberCardProps {
  image: string;
  name: string;
  city: string;
}

const MemberCard: FC<MemberCardProps> = ({ image, name, city }) => {
  return (
    <div>
      <Img src={image} alt={name} />
      <h1>{name}</h1>
      <h2>{city}</h2>
    </div>
  );
};

export default MemberCard;
