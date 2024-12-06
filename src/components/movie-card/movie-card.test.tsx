import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieCard from "./movie-card";
import { ALL_MOVIES } from "../../constants/app-constants";

jest.mock("../Img/Img.tsx", () => ({ src }: { src: string }) => (
  <img data-testid="movie-img" src={src} />
));
jest.mock(
  "../thumbs-up/thumbs-up.tsx",
  () =>
    ({ liked, onClick }: { liked: boolean; onClick: () => void }) =>
      (
        <button data-testid="thumbs-up-btn" onClick={onClick}>
          {liked ? "Liked" : "Like"}
        </button>
      )
);

describe("MovieCard Component", () => {
  const mockMovieData = {
    id: 1,
    name: "Inception",
    imgUrl: "inception.jpg",
    likes: 100,
    description: "sample desc",
    actors: ["hary", "lara"],
  };

  const mockOnMovieSelect = jest.fn();
  const mockHandleLike = jest.fn();

  test("renders movie card with correct details", () => {
    render(
      <MovieCard
        movieData={mockMovieData}
        onMovieSelect={mockOnMovieSelect}
        handleLike={mockHandleLike}
      />
    );
    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText(`100 ${ALL_MOVIES.LIKES_TXT}`)).toBeInTheDocument();
    const imgElement = screen.getByTestId("movie-img");
    expect(imgElement).toHaveAttribute("src", "inception.jpg");
    const thumbsUpBtn = screen.getByTestId("thumbs-up-btn");
    expect(thumbsUpBtn).toHaveTextContent("Like");
  });

  test("calls onMovieSelect when movie image is clicked", () => {
    render(
      <MovieCard
        movieData={mockMovieData}
        onMovieSelect={mockOnMovieSelect}
        handleLike={mockHandleLike}
      />
    );
    const movieImg = screen.getByTestId("movie-img");
    fireEvent.click(movieImg);
    expect(mockOnMovieSelect).toHaveBeenCalledTimes(1);
  });

  test("calls handleLike when ThumbsUp button is clicked", () => {
    render(
      <MovieCard
        movieData={mockMovieData}
        onMovieSelect={mockOnMovieSelect}
        handleLike={mockHandleLike}
      />
    );
    const thumbsUpBtn = screen.getByTestId("thumbs-up-btn");
    fireEvent.click(thumbsUpBtn);
    expect(mockHandleLike).toHaveBeenCalledTimes(1);
  });
});
