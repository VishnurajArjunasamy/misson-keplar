import MovieCard from "../../components/movie-card/movie-card";
import { ALL_MOVIES } from "../../constants/app-constants";
import { AllMoviesIF } from "../../modals/allMoviesModal";
import styles from "./movies-container.module.scss";

import { FC, memo } from "react";

interface MoviesContainerProps {
  movies: AllMoviesIF[] | undefined;
  setSelectedMovie: React.Dispatch<
    React.SetStateAction<AllMoviesIF | undefined>
  >;
}

const MoviesContainer: FC<MoviesContainerProps> = ({
  movies,
  setSelectedMovie,
}) => {
  function handleMovieSelect(id: number) {
    const movie = movies?.find((movie) => movie.id == id);
    setSelectedMovie(movie);
  }
  return (
    <section className={styles["movie-container"]}>
      {movies?.map((movie) => (
        <MovieCard
          key={movie.id}
          movieData={movie}
          onMovieSelect={() => handleMovieSelect(movie.id)}
        />
      ))}
    </section>
  );
};

export default memo(MoviesContainer);
