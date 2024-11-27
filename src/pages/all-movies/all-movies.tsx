import { memo, useEffect, useState } from "react";
import MoviesContainer from "../../containers/movies-container/movies-container";
import MoviesDescContainer from "../../containers/movies-desc-container/movies-desc-container";
import styles from "./all-movies.module.scss";
import { AllMoviesIF } from "../../modals/allMoviesModal";
import { getAllMovies } from "../../services/getAllMovies";
import { ALL_MOVIES } from "../../constants/app-constants";
import { Loader } from "../../components/loader/loader";

const AllMovies = () => {
  const [movies, setMovies] = useState<AllMoviesIF[]>();
  const [isLoadng, setIsLoading] = useState<boolean>(true);
  const [selectedMovie, setSelectedMovie] = useState<AllMoviesIF>();
  const [mvToDispaly, setMvToDisplay] = useState<number>(6);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAllMovies();
        setMovies(result);
        setSelectedMovie(result[0]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleMovieLike = (id: number) => {
    setMovies(
      movies?.map((movie) =>
        movie.id == id
          ? {
              ...movie,
              likes: movie.liked ? movie.likes - 1 : movie.likes + 1,
              liked: !movie.liked,
            }
          : movie
      )
    );
  };

  if (isLoadng) {
    return (
      <div className={styles["loader-container"]}>
        <Loader />
      </div>
    );
  }
  return (
    <section className={styles["all-movies-page"]}>
      <h1 className={styles["all-movies-heading"]}>{ALL_MOVIES.HEADING}</h1>
      <div className={styles["movie-and-desc"]}>
        <MoviesContainer
          movies={movies}
          setSelectedMovie={setSelectedMovie}
          handleLike={handleMovieLike}
          mvToDisplay={mvToDispaly}
          setMvToDisplay={setMvToDisplay}
        />
        <MoviesDescContainer
          movies={movies}
          selectedMovie={selectedMovie}
          handleLike={handleMovieLike}
        />
      </div>
    </section>
  );
};

export default memo(AllMovies);
