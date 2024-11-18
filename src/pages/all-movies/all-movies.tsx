import { memo, useEffect, useState } from "react";
import MoviesContainer from "../../containers/movies-container/movies-container";
import MoviesDescContainer from "../../containers/movies-desc-container/movies-desc-container";
import styles from "./all-movies.module.scss";
import { AllMoviesIF } from "../../modals/allMoviesModal";
import { getAllMovies } from "../../services/getAllMovies";
import { ALL_MOVIES } from "../../constants/app-constants";

const AllMovies = () => {
  const [movies, setMovies] = useState<AllMoviesIF[]>();
  const [isLoadng, setIsLoading] = useState<boolean>(true);
  const [selectedMovie, setSelectedMovie] = useState<AllMoviesIF>();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAllMovies();
        setMovies(result);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  if (isLoadng) {
    return <p>Loading...</p>;
  }
  return (
    <section className={styles["all-movies-page"]}>
      <h1 className={styles["all-movies-heading"]}>{ALL_MOVIES.HEADING}</h1>
      <div className={styles['movie-and-desc']}>
        <MoviesContainer movies={movies} setSelectedMovie={setSelectedMovie} />
        <MoviesDescContainer selectedMovie={selectedMovie} />
      </div>
    </section>
  );
};

export default memo(AllMovies);
