import { FC, use, useEffect } from "react";
import Img from "../../components/Img/img";
import { AppDispatch, RootState } from "../../store";
import { BlogWithIdIF } from "../../modals/blog-list-modal";
import { useDispatch, useSelector } from "react-redux";
import classes from "./blog-details.module.scss";
import placeholder from "../../assets/images/placeholder-image.jpg";
import Input from "../../components/input/input";
import TextArea from "../../components/text-area/text-area";
import Button from "../../components/button/button";
import {
  setIsReadOnly,
  setUpdateBlogError,
  updateBlog,
} from "../../store/blog-details-slice";
import { ValidationErrors } from "../../modals/new-blog-modal";
import React from "react";
import PopUp from "../../components/popup-modal/popup";

interface BlogDetailsProps {}

const BlogDetails: FC<BlogDetailsProps> = ({}) => {
  const { selectedBlog: selectedBlogId } = useSelector(
    (state: RootState) => state.blogList
  );
  const blogs = useSelector(
    (state: RootState) => state.blogList.data
  ) as BlogWithIdIF[];

  const { isReadOnly, error } = useSelector(
    (state: RootState) => state.blogDetails
  );
  const isDarkMode = useSelector(
    (state: RootState) => state.sideBar.isDarkMode
  );
  const dispatch = useDispatch<AppDispatch>();

  const titleRef = React.createRef<HTMLInputElement>();
  const detailsRef = React.createRef<HTMLTextAreaElement>();

  //find the selected blog
  const selectedBlog = blogs?.find((blog) => blog.id === selectedBlogId);

  //set a placeholder image if the blog has no image
  const blogImage = selectedBlog?.photo ? selectedBlog?.photo : placeholder;

  const setInputValues = () => {
    if (titleRef.current) {
      titleRef.current.value = selectedBlog?.title || "";
    }
    if (detailsRef.current) {
      detailsRef.current.value = selectedBlog?.details || "";
    }
  };

  useEffect(() => {
    if (!isReadOnly) {
      dispatch(setIsReadOnly(true));
    }

    //setting the value of the input fields for the selected blog
    setInputValues();
  }, [selectedBlog]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const blogData = {
      title: formData.get("title"),
      details: formData.get("details"),
      // photo: formData.get("photo"),
      type: selectedBlog?.type,
      id: selectedBlog?.id,
    };

    const validationErrors: ValidationErrors = {} as ValidationErrors;
    if (!blogData.title) {
      validationErrors["title"] = "Title is required";
    }
    if (!blogData.details) {
      validationErrors["details"] = "Details is required";
    }

    // set the error if there is any
    if (Object.keys(validationErrors).length > 0) {
      console.log(validationErrors);
      dispatch(setUpdateBlogError(validationErrors));
      return;
    }

    // remove the setted error if there is no error
    dispatch(setUpdateBlogError(validationErrors));

    //creating  a deep copy of the blogs array
    let withUpdatedBlogs: BlogWithIdIF[] = JSON.parse(JSON.stringify(blogs));
    const index = withUpdatedBlogs.findIndex(
      (blog) => blog.id === selectedBlogId
    );
    withUpdatedBlogs[index] = blogData as BlogWithIdIF;

    //calling async function to update the blog
    try {
      dispatch(updateBlog(withUpdatedBlogs));
    } catch (error) {
      console.log(error);
    }
    dispatch(setIsReadOnly(true));
  };

  const editButton = (
    <div className={`${classes.button} ${classes.blueBg}`}>
      <Button
        type="button"
        onClick={() => {
          dispatch(setIsReadOnly(false));
        }}
        label={"EDIT CONTENT"}
      />
    </div>
  );

  const cancelButton = (
    <div className={`${classes.button} ${classes.blueBg}`}>
      <Button
        type="button"
        onClick={() => {
          dispatch(setIsReadOnly(true));
          setInputValues();
        }}
        label={"CANCEL"}
      />
    </div>
  );

  const saveButton = (
    <div className={`${classes.button} ${classes.purpleBg}`}>
      <Button type="submit" label={"SAVE"} />
    </div>
  );

  let buttons = null;
  if (isReadOnly) {
    buttons = editButton;
  } else {
    buttons = (
      <div className={classes.buttonsContainer}>
        {cancelButton}
        {saveButton}
      </div>
    );
  }

  const style = `${classes.blogDetails} ${
    isDarkMode ? classes.dark : classes.light
  }`;

  return (
    <section className={style}>
      <div className={classes.blogImage}>
        <Img src={blogImage} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className={classes.blogTitle}>
          <Input
            type="text"
            name={"title"}
            isReadOnly={isReadOnly}
            ref={titleRef}
          />
          {(error as ValidationErrors)?.title && (
            <p className={classes.error}>{(error as ValidationErrors).title}</p>
          )}
        </div>
        <div className={classes.blogContent}>
          <TextArea name={"details"} isReadOnly={isReadOnly} ref={detailsRef} />
          {(error as ValidationErrors)?.details && (
            <p className={classes.error}>
              {(error as ValidationErrors).details}
            </p>
          )}
        </div>
        {buttons}
      </form>
    </section>
  );
};

export default BlogDetails;
