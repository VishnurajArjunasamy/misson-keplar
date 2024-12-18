import BlogDetails from "../../containers/blog-details/blog-details";
import BlogList from "../../containers/blog-list/blog-list";
import SideBar from "../../containers/side-bar/side-bar";
import styles from "./home.module.scss";

const Home = () => {
  return (
    <div className={styles.home}>
      <SideBar />
      <BlogList />
      <BlogDetails />
    </div>
  );
};

export default Home;
