import { FC } from "react";
import classes from "./blog-card.module.scss";
import { BlogIF } from "../../modals/blog-list-modal";

interface BlogCardProps {
  title: string;
  details: string;
  type: string;
}

const BlogCard: FC<BlogCardProps> = ({ title, details, type }) => {
  return (
    <div className={classes.blogCard}>
      <h1>{title}</h1>
      <h2>{type}</h2>
      <p>{details}</p>
    </div>
  );
};

export default BlogCard;
