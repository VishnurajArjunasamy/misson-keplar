import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/input/input";
import classes from "./new-blog.module.scss";
import { AppDispatch, RootState } from "../../store";
import TextArea from "../../components/text-area/text-area";
import Button from "../../components/button/button";
import { ValidationErrors } from "../../modals/new-blog-modal";
import {
  addNewBlog,
  setNewBlogError,
  setShowNewBlogModal,
} from "../../store/new-blog-slice";
import { BlogWithIdIF } from "../../modals/blog-list-modal";
import { useEffect } from "react";
import { NEW_BLOG } from "../../constants/app.constants";

const NewBlog = () => {
  const existingBlogs = useSelector((state: RootState) => state.blogList.data);
  const isDark = useSelector((state: RootState) => state.sideBar.isDarkMode);
  const error = useSelector((state: RootState) => state.newBlog.error);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    return () => {
      dispatch(setNewBlogError(null));
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const blogData = {
      title: formData.get("title"),
      details: formData.get("details"),
      photo: formData.get("photo"),
      type: "Local",
      id: crypto.randomUUID(),
    };

    const validationErrors: ValidationErrors = {} as ValidationErrors;
    if (!blogData.title) {
      validationErrors["title"] = NEW_BLOG.INPUT_TITLE.ERROR;
    }
    if (!blogData.details) {
      validationErrors["details"] = NEW_BLOG.INPUT_DETAILS.ERROR;
    }

    if (Object.keys(validationErrors).length > 0) {
      console.log(validationErrors);
      dispatch(setNewBlogError(validationErrors));
      return;
    }

    dispatch(setNewBlogError(validationErrors));

    const withNewBlogs: BlogWithIdIF[] = JSON.parse(
      JSON.stringify(existingBlogs)
    );
    withNewBlogs?.push(blogData as BlogWithIdIF);

    try {
      dispatch(addNewBlog(withNewBlogs));
      dispatch(setShowNewBlogModal(false));
    } catch (error) {
      console.log(error);
    }
  };
  const style = `${classes.newBlog} ${isDark ? classes.dark : classes.light}`;
  return (
    <div className={style}>
      <h1>{NEW_BLOG.TITLE}</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.input}>
          <Input
            type="string"
            placeholder={NEW_BLOG.INPUT_TITLE.PLACEHOLDER}
            name={NEW_BLOG.INPUT_TITLE.NAME}
          />
          {(error as ValidationErrors)?.title && (
            <p className={classes.error}>{(error as ValidationErrors).title}</p>
          )}
        </div>
        <div className={classes.blogImage}>
          <Input
            type="string"
            placeholder={NEW_BLOG.INPUT_IMAGE.PLACEHOLDER}
            name={NEW_BLOG.INPUT_IMAGE.NAME}
          />
        </div>
        <div className={classes.blogDetails}>
          <TextArea
            placeholder={NEW_BLOG.INPUT_DETAILS.PLACEHOLDER}
            name={NEW_BLOG.INPUT_DETAILS.NAME}
          />
          {(error as ValidationErrors)?.details && (
            <p className={classes.error}>
              {(error as ValidationErrors).details}
            </p>
          )}
        </div>
        <div className={classes.button}>
          <Button type="submit" label={NEW_BLOG.ADD_BTN} />
        </div>
      </form>
    </div>
  );
};

export default NewBlog;
