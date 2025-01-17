import { FC, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogs,
  setBufferBlogId,
  setSelectedBlogs,
} from "../../store/blog-list-slice";
import { AppDispatch, RootState } from "../../store";
import BlogCard from "../../components/blog-card/blog-card";
import classes from "./blog-list.module.scss";
import SearchBar from "../../components/search-bar/search-bar";
import Button from "../../components/button/button";
import { BLOG_LIST } from "../../constants/app.constants";
import { BlogWithIdIF } from "../../modals/blog-list-modal";
import Modal from "../../components/modal/modal";
import NewBlog from "../new-blog/new-blog";
import { setShowNewBlogModal } from "../../store/new-blog-slice";
import PopUp from "../../components/popup-modal/popup";
import { setShowPopUPModal } from "../../store/blog-details-slice";
import { Loader } from "../../components/loader/loader";

interface BlogListProps {}

const BlogList: FC<BlogListProps> = ({}) => {
  const {
    data,
    loading,
    error,
    filters,
    selectedBlog,
    searchQuery,
    bufferBlogId,
  } = useSelector((state: RootState) => state.blogList);
  const { showNewBlogModal } = useSelector((state: RootState) => state.newBlog);
  const { isReadOnly, showPopUPModal } = useSelector(
    (state: RootState) => state.blogDetails
  );
  const isDark = useSelector((state: RootState) => state.sideBar.isDarkMode);
  const dispatch = useDispatch<AppDispatch>();

  let filteredBlogs: BlogWithIdIF[] | undefined = [];

  //filter the blogs based on the blog types
  filteredBlogs = data?.filter((blog) => {
    return filters[blog.type];
  });

  //filter blogs based on the search param
  if (searchQuery && searchQuery?.length >= 4) {
    filteredBlogs = filteredBlogs?.filter((data) =>
      data.title
        .toLocaleLowerCase()
        .includes(searchQuery?.toLocaleLowerCase() || "")
    );
  }

  //Initial data fetch
  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  if (loading) {
    return (
      <div
        className={`${classes.loaderContainer} ${
          isDark ? classes.dark : classes.light
        }`}
      >
        <Loader />
      </div>
    );
  }
  if (error) {
    return error;
  }

  const handleBlogSelect = (id: string): void => {
    dispatch(setBufferBlogId(id));
    if (isReadOnly) {
      dispatch(setSelectedBlogs(id));
    } else {
      dispatch(setShowPopUPModal(true));
    }
  };

  function handleNewBlog() {
    dispatch(setShowNewBlogModal(true));
  }

  const style = `${classes.blogList} ${isDark ? classes.dark : classes.light}`;

  return (
    <div className={style}>
      <div className={classes.blogFeatures}>
        <SearchBar />
        <div className={classes.newBtn}>
          <Button label={BLOG_LIST.NEW_BTN} onClick={handleNewBlog} />
        </div>
      </div>

      <section className={classes.blogs}>
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
      {showNewBlogModal && (
        <Modal closeModal={() => dispatch(setShowNewBlogModal(false))}>
          {<NewBlog />}
        </Modal>
      )}
      {showPopUPModal && (
        <PopUp
          closeModal={() => dispatch(setShowPopUPModal(false))}
          handleBlogSwitch={() => {
            dispatch(setSelectedBlogs(bufferBlogId));
            dispatch(setShowPopUPModal(false));
          }}
          handleCancel={() => dispatch(setShowPopUPModal(false))}
        />
      )}
    </div>
  );
};

export default memo(BlogList);
