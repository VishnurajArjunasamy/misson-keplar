import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/input/input";
import classes from "./new-blog.module.scss";
import { AppDispatch, RootState } from "../../store";
import TextArea from "../../components/text-area/text-area";
import Button from "../../components/button/button";
import { NewBlogIF, ValidationErrors } from "../../modals/new-blog-modal";
import { addNewBlog } from "../../store/new-blog-slice";
import { setBlogs } from "../../store/blog-list-slice";
import { BlogWithIdIF } from "../../modals/blog-list-modal";

const NewBlog = () => {
  const existingBlogs = useSelector((state: RootState) => state.blogList.data);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const blogData = {
      title: formData.get("title"),
      details: formData.get("details"),
      photo: "",
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
      return;
    }

    const withNewBlogs: BlogWithIdIF[] = JSON.parse(
      JSON.stringify(existingBlogs)
    );
    withNewBlogs?.push(blogData as BlogWithIdIF);

    try {
      dispatch(addNewBlog(withNewBlogs));
      // dispatch(setBlogs(blogData))
    } catch (error) {
      console.log(error);
    }
  };
  const style = classes.newBlog;
  return (
    <div className={style}>
      <h1>{"Add New Blog"}</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.titleInput}>
          <Input type="string" placeholder={"Name your blog"} name="title" />
        </div>
        {/* <div className={classes.blogImage}>
          <Input type="string" placeholder={"Blog Image URL"} name="photo" />
        </div> */}
        <div className={classes.textArea}>
          <TextArea placeholder={"Write Content Here .."} name="details" />
        </div>
        <div className={classes.button}>
          <Button label={"ADD"} />
        </div>
      </form>
    </div>
  );
};

export default NewBlog;
