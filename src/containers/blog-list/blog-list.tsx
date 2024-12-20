import { FC, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, setSelectedBlogs } from "../../store/blog-list-slice";
import { AppDispatch, RootState } from "../../store";
import BlogCard from "../../components/blog-card/blog-card";
import classes from "./blog-list.module.scss";
import SearchBar from "../../components/search-bar/search-bar";
import Button from "../../components/button/button";
import { BLOG_LIST } from "../../constants/app.constants";

interface BlogListProps {}

const BlogList: FC<BlogListProps> = ({}) => {
  const { data, loading, error, filters, selectedBlog } = useSelector(
    (state: RootState) => state.blogList
  );
  const isDark = useSelector((state: RootState) => state.sideBar.isDarkMode);
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

  const style = `${classes.blogList} ${isDark ? classes.dark : classes.light}`;

  const handleBlogSelect = (id: String): void => {
    dispatch(setSelectedBlogs(id));
  };

  const handleNewBlog = () => {};
  return (
    <div className={style}>
      <div className={classes.blogFeatures}>
        <SearchBar />
        <div className={classes.newBtn}>
          <Button label={BLOG_LIST.NEW_BTN} onClick={handleNewBlog} />
        </div>
      </div>

      <section>
        {filteredBlogs?.map((blog) => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            details={blog.details}
            type={blog.type}
            onClick={() => {
              handleBlogSelect(blog.id);
            }}
            active={selectedBlog == blog.id}
          />
        ))}
        {filteredBlogs && filteredBlogs.length < 1 && (
          <p>Choose a filter to see blogs</p>
        )}
      </section>
    </div>
  );
};

export default memo(BlogList);
