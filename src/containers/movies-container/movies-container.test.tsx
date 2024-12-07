import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MoviesContainer from "./movies-container";
import { AllMoviesIF } from "../../modals/allMoviesModal";

describe("MoviesContainer Component", () => {
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
    {
      id: 4,
      name: "Movie 4",
      description: "desc",
      actors: ["an", "joshy"],
      likes: 85,
      imgUrl: "movie4.com",
    },
  ];

  const mockSetSelectedMovie = jest.fn();
  const mockSetMvToDisplay = jest.fn();
  const mockHandleLike = jest.fn();

  test("renders the correct number of movie cards based on mvToDisplay", () => {
    render(
      <MoviesContainer
        movies={mockMovies}
        handleLike={mockHandleLike}
        setSelectedMovie={mockSetSelectedMovie}
        mvToDisplay={3}
        setMvToDisplay={mockSetMvToDisplay}
      />
    );
    const movieCards = screen.getAllByTestId("movie-card");
    expect(movieCards.length).toBe(3);
  });

  test("calls setSelectedMovie when a movie is selected", () => {
    render(
      <MoviesContainer
        movies={mockMovies}
        handleLike={mockHandleLike}
        setSelectedMovie={mockSetSelectedMovie}
        mvToDisplay={3}
        setMvToDisplay={mockSetMvToDisplay}
      />
    );

    const movieCards = screen.getAllByTestId("movie-card");
    fireEvent.click(movieCards[0].querySelector("img") as Element);
    expect(mockSetSelectedMovie).toHaveBeenCalled();
  });

  test("renders the Load More button and calls setMvToDisplay when clicked", () => {
    render(
      <MoviesContainer
        movies={mockMovies}
        handleLike={mockHandleLike}
        setSelectedMovie={mockSetSelectedMovie}
        mvToDisplay={3}
        setMvToDisplay={mockSetMvToDisplay}
      />
    );

    const loadMoreButton = screen.getByText("LOAD MORE");
    expect(loadMoreButton).toBeInTheDocument();
    fireEvent.click(loadMoreButton);
    expect(mockSetMvToDisplay).toHaveBeenCalledWith(expect.any(Function));
  });

  test("does not render Load More button if all movies are displayed", () => {
    render(
      <MoviesContainer
        movies={mockMovies}
        handleLike={mockHandleLike}
        setSelectedMovie={mockSetSelectedMovie}
        mvToDisplay={mockMovies.length}
        setMvToDisplay={mockSetMvToDisplay}
      />
    );
    const loadMoreButton = screen.queryByText("LOAD MORE");
    expect(loadMoreButton).not.toBeInTheDocument();
  });
});
