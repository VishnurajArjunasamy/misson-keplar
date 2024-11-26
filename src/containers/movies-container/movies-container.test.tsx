import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MoviesContainer from "./movies-container";
import { AllMoviesIF } from "../../modals/allMoviesModal";

const mockMovies: AllMoviesIF[] = [
  {
    id: 1,
    name: "Movie 1",
    description: "desc",
    actors: ["ana", "josh"],
    likes: 8,
    imgUrl: "movie.com",
  },
  {
    id: 2,
    name: "Movie 2",
    description: "desc",
    actors: ["ana", "josh"],
    likes: 8,
    imgUrl: "movie.com",
  },
  {
    id: 3,
    name: "Movie 3",
    description: "desc",
    actors: ["ana", "josh"],
    likes: 8,
    imgUrl: "movie.com",
  },
];


it("renders movie cards based on the movies prop", () => {
  render(
    <MoviesContainer
      movies={mockMovies}
      mvToDisplay={2}
      handleLike={()=>{}}
      setSelectedMovie={()=>{}}
      setMvToDisplay={()=>{}}
    />
  );

  expect(screen.getByText("Movie 1")).toBeInTheDocument();
  expect(screen.getByText("Movie 2")).toBeInTheDocument();
  expect(screen.queryByText("Movie 3")).not.toBeInTheDocument();
});
