import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MoviesDescContainer from "./movies-desc-container";

jest.mock("../../helper/withAdvertisement", () => ({
  withAdvertisement: (Component: any) => Component,
}));

const mockMovies = [
  {
    id: 1,
    name: "Movie 1",
    likes: 10,
    liked: true,
    imgUrl: "movie1.jpg",
    description: "Description of Movie 1",
    actors: ["Actor 1", "Actor 2"],
  },
  {
    id: 2,
    name: "Movie 2",
    likes: 20,
    liked: false,
    imgUrl: "movie2.jpg",
    description: "Description of Movie 2",
    actors: ["Actor 3", "Actor 4"],
  },
];

const mockProps = {
  movies: mockMovies,
  selectedMovie: mockMovies[0],
  handleLike: jest.fn(),
  timer: "00:10",
  startTimer: jest.fn(),
  stopTimer: jest.fn(),
  seconds: 10,
  setSeconds: jest.fn(),
};

describe("MoviesDescContainer Component", () => {
  test("renders the selected movie information", () => {
    render(<MoviesDescContainer {...mockProps} />);
    expect(screen.getByText("Movie 1")).toBeInTheDocument();

    expect(screen.getByText("Description of Movie 1")).toBeInTheDocument();

    expect(screen.getByText("10 Likes")).toBeInTheDocument();

    expect(screen.getByText("Actor 1")).toBeInTheDocument();
    expect(screen.getByText("Actor 2")).toBeInTheDocument();

    const image = screen.getByTestId("image-poster");
    expect(image).toHaveAttribute("src", "movie1.jpg");
  });

  test("renders an advertisement when isAdPlaying is true", () => {
    const propsWithAd = {
      ...mockProps,
      seconds: 0,
      isAdPlaying: true,
    };

    render(<MoviesDescContainer {...propsWithAd} />);

    const adImage = screen.getByRole("img");
    expect(adImage).toHaveAttribute("src", expect.any(String));

    expect(screen.getByText("Advertisement in 00:10")).toBeInTheDocument();
  });

  test("calls handleLike when the thumbs up icon is clicked", () => {
    render(<MoviesDescContainer {...mockProps} />);

    const thumbsUpButton = screen.getByTestId("thumbs-up");
    fireEvent.click(thumbsUpButton);

    expect(mockProps.handleLike).toHaveBeenCalledWith(1);
  });

  test("starts the timer when a new movie is selected", () => {
    render(<MoviesDescContainer {...mockProps} />);

    expect(mockProps.startTimer).toHaveBeenCalledWith(15);
  });

  it("shows an ad when seconds reach 0 and switches back to info after the ad ends", async () => {
    const updatedProps = {
      ...mockProps,
      seconds: 0,
      isAdPlaying: false,
      isInfoShowing: true,
    };

    const { rerender } = render(<MoviesDescContainer {...updatedProps} />);

    await waitFor(() => {
      expect(mockProps.startTimer).toHaveBeenCalledWith(5);
    });

    const newProps = {
      ...updatedProps,
      isAdPlaying: true,
      isInfoShowing: false,
      seconds: 0,
    };

    rerender(<MoviesDescContainer {...newProps} />);

    // Switches back to info after the ad ends
    await waitFor(() => {
      expect(mockProps.stopTimer).toHaveBeenCalled();
    });
  });
});
