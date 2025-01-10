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
      validationErrors["title"] = "Title is required";
    }
    if (!blogData.details) {
      validationErrors["details"] = "Details is required";
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
      <h1>{"Add New Blog"}</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.input}>
          <Input type="string" placeholder={"Name your blog"} name="title" />
          {(error as ValidationErrors)?.title && (
            <p className={classes.error}>{(error as ValidationErrors).title}</p>
          )}
        </div>
        <div className={classes.blogImage}>
          <Input type="string" placeholder={"Blog Image URL"} name="photo" />
        </div>
        <div className={classes.blogDetails}>
          <TextArea placeholder={"Write Content Here .."} name="details" />
          {(error as ValidationErrors)?.details && (
            <p className={classes.error}>
              {(error as ValidationErrors).details}
            </p>
          )}
        </div>
        <div className={classes.button}>
          <Button type="submit" label={"ADD"} />
        </div>
      </form>
    </div>
  );
};

export default NewBlog;
