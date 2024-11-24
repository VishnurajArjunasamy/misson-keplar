import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieCard from "./movie-card";

it("Check if Movie card displays", () => {
  const mockMovieData = {
    id: 1,
    name: "Inception",
    imgUrl: "https://example.com/inception.jpg",
    likes: 100,
    description: "sample desc",
    actors: ["hary", "lara"],
  };
  render(
    <MovieCard
      movieData={mockMovieData}
      onMovieSelect={() => {}}
      handleLike={() => {}}
    />
  );

  expect(screen.getByText("Inception")).toBeInTheDocument();
});
