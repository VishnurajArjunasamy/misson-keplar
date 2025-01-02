import { FC } from "react";
import Img from "../Img/img";
import classes from "./member-card.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface MemberCardProps {
  image: string;
  name: string;
  city: string;
}

const MemberCard: FC<MemberCardProps> = ({ image, name, city }) => {
  const isDarkMode = useSelector(
    (state: RootState) => state.sideBar.isDarkMode
  );
  return (
    <div
      className={`${classes.member} ${
        isDarkMode ? classes.dark : classes.light
      }`}
    >
      <Img src={image} alt={name} />
      <h1>{name}</h1>
      <h2>{city}</h2>
    </div>
  );
};

export default MemberCard;
