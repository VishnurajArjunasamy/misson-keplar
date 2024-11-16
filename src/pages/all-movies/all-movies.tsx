import { ALL_MOVIES } from "../../constants/app-constants";
import MoviesContainer from "../../containers/movies-container/movies-container";
import styles from "./all-movies.module.scss";

const AllMovies = () => {
  return (
    <section className={styles["all-movies-page"]}>
      <h1>{ALL_MOVIES.HEADING}</h1>
      <MoviesContainer />
    </section>
  );
};

export default AllMovies;
