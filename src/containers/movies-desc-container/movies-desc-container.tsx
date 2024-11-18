import { FC } from "react";
import styles from "./movies-desc-container.module.scss";
import { AllMoviesIF } from "../../modals/allMoviesModal";

interface MoviesDescContainerProps {
  selectedMovie: AllMoviesIF | undefined;
}

const MoviesDescContainer: FC<MoviesDescContainerProps> = ({
  selectedMovie,
}) => {
  console.log(selectedMovie);

  return <div>movies-desc-ontainer</div>;
};

export default MoviesDescContainer;
