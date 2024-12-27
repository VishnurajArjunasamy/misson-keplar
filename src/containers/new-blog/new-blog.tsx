import { useSelector } from "react-redux";
import Input from "../../components/input/input";
import classes from "./new-blog.module.scss";
import { RootState } from "../../store";
import TextArea from "../../components/text-area/text-area";

const NewBlog = () => {
  const { title, details } = useSelector((state: RootState) => state.newBlog);
  const style = classes.newBlog;
  return (
    <div className={style}>
      <h1>{"Add New Blog"}</h1>
      <form>
        <div className={classes.titleInput}>
          <Input type="string" placeholder={"Name your blog"} />
        </div>
        <div>
          <TextArea  placeholder={"Write Content Here .."} />
        </div>
      </form>
    </div>
  );
};

export default NewBlog;
