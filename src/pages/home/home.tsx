import { ToastContainer } from "react-toastify";
import BlogDetails from "../../containers/blog-details/blog-details";
import BlogList from "../../containers/blog-list/blog-list";
import SideBar from "../../containers/side-bar/side-bar";
import styles from "./home.module.scss";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <SideBar />
      <BlogList />
      <BlogDetails />
      <ToastContainer />
    </div>
  );
};

export default Home;
