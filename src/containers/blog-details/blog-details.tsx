import { FC } from "react";
import Img from "../../components/Img/img";
import { RootState } from "../../store";
import { BlogWithIdIF } from "../../modals/blog-list-modal";
import { useDispatch, useSelector } from "react-redux";
import classes from "./blog-details.module.scss";
import placeholder from "../../assets/images/placeholder-image.jpg";
import Input from "../../components/input/input";
import TextArea from "../../components/text-area/text-area";
import Button from "../../components/button/button";
import { setIsReadOnly } from "../../store/blog-details-slice";

interface BlogDetailsProps {}

const BlogDetails: FC<BlogDetailsProps> = ({}) => {
  const { selectedBlog: selectedBlogId } = useSelector(
    (state: RootState) => state.blogList
  );
  const blogs = useSelector(
    (state: RootState) => state.blogList.data
  ) as BlogWithIdIF[];

  const { isReadOnly } = useSelector((state: RootState) => state.blogDetails);

  const dispatch = useDispatch();

  //find the selected blog
  const selectedBlog = blogs?.find((blog) => blog.id === selectedBlogId);
  const blogImage =
    selectedBlog?.photo != "" ? selectedBlog?.photo : placeholder;

  let buttons = null;

  if (isReadOnly) {
    buttons = (
      <Button
        type="button"
        onClick={() => {
          dispatch(setIsReadOnly(false));
        }}
        label={"Edit"}
      />
    );
  } else {
    buttons = (
      <Button
        type="button"
        onClick={() => {
          dispatch(setIsReadOnly(true));
        }}
        label={"Save"}
      />
    );
  }

  const style = `${classes.blogDetails}`;

  return (
    <section className={style}>
      <div className={classes.blogImage}>
        <Img src={blogImage} />
      </div>
      <form>
        <div className={classes.blogTitle}>
          <Input
            type="text"
            defaultValue={selectedBlog?.title}
            name={"title"}
            isReadOnly={isReadOnly}
          />
        </div>
        <div className={classes.blogContent}>
          <TextArea
            defaultValue={selectedBlog?.details}
            name={"details"}
            isReadOnly={isReadOnly}
          />
        </div>
      </form>
      {buttons}
    </section>
  );
};

export default BlogDetails;
