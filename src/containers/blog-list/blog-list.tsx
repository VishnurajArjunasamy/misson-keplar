import { FC, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../store/blog-list-slice";
import { AppDispatch, RootState } from "../../store";
import BlogCard from "../../components/blog-card/blog-card";
import classes from "./blog-list.module.scss";

interface BlogListProps {}

const BlogList: FC<BlogListProps> = ({}) => {
  const { data, loading, error, filters } = useSelector(
    (state: RootState) => state.blogList
  );
  const dispatch = useDispatch<AppDispatch>();

  const filteredBlogs = data?.filter((blog) => {
    return filters[blog.type];
  });

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  if (loading) {
    return "Loading...";
  }
  if (error) {
    return error;
  }

  return (
    <div className={classes.blogList}>
      {filteredBlogs?.map((blog) => (
        <BlogCard
          key={blog.id}
          title={blog.title}
          details={blog.details}
          type={blog.type}
        />
      ))}
      {filteredBlogs && filteredBlogs.length < 1 && (
        <p>Choose a filter to see blogs</p>
      )}
    </div>
  );
};

export default memo(BlogList);
