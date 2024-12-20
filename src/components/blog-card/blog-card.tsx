import { FC } from "react";
import classes from "./blog-card.module.scss";
import { BlogIF } from "../../modals/blog-list-modal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface BlogCardProps {
  title: string;
  details: string;
  type: string;
  onClick: () => void;
  active?: boolean;
}

const BlogCard: FC<BlogCardProps> = ({
  title,
  details,
  type,
  onClick,
  active,
}) => {
  const isDark = useSelector((state: RootState) => state.sideBar.isDarkMode);
  let style;
  if (isDark) {
    style = `${classes.blogCard} ${classes.dark} ${
      active && classes.active
    }`;
  } else {
    style = `${classes.blogCard} ${classes.light} ${
      active && classes.active
    }`;
  }

  return (
    <div className={style} onClick={onClick}>
      <h1>{title}</h1>
      <h2>{type}</h2>
      <p>{details}</p>
    </div>
  );
};

export default BlogCard;
