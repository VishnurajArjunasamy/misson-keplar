import Button from "../../components/button/button";
import MovieCard from "../../components/movie-card/movie-card";
import { AllMoviesIF } from "../../modals/allMoviesModal";
import styles from "./movies-container.module.scss";

import { FC, memo } from "react";

interface MoviesContainerProps {
  movies: AllMoviesIF[] | undefined;
  setSelectedMovie: React.Dispatch<
    React.SetStateAction<AllMoviesIF | undefined>
  >;
  mvToDisplay: number;
  setMvToDisplay: React.Dispatch<React.SetStateAction<number>>;
  handleLike: (id: number) => void;
}

const MoviesContainer: FC<MoviesContainerProps> = ({
  movies,
  handleLike,
  setSelectedMovie,
  mvToDisplay,
  setMvToDisplay,
}) => {
  function handleMovieSelect(id: number) {
    const movie = movies?.find((movie) => movie.id == id);
    setSelectedMovie(movie);
  }

  function handleMovieLoad() {
    setMvToDisplay((prev) => prev + 6);
  }


  return (
    <div className={styles["movie-section"]}>
      <section className={styles["movie-container"]}>
        {movies?.slice(0, mvToDisplay)?.map((movie) => (
          <MovieCard
            key={movie.id}
            movieData={movie}
            onMovieSelect={() => handleMovieSelect(movie.id)}
            handleLike={handleLike}
          />
        ))}
      </section>
      {movies && movies?.length > mvToDisplay && (
        <Button size="lg" onClick={handleMovieLoad}>
          LOAD MORE
        </Button>
      )}
    </div>
  );
};

export default memo(MoviesContainer);
