import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AllMovies from "./all-movies"; 
import { getAllMovies } from "../../services/getAllMovies/getAllMovies";
import "@testing-library/jest-dom";

jest.mock("../../services/getAllMovies/getAllmovies", () => ({
  getAllMovies: jest.fn(),
}));

describe("AllMovies Component", () => {
  const mockMovies = [
    {
      id: 1,
      name: "Vagai Suda Va",
      description: "Veluthambi, who aspires for a government job, age. ",
      actors: ["Ineya", "Vimal", "Bhagyaraj", "Ponvannan", "Thambi Ramaiah"],
      imgUrl: "sample1.jpg",
      likes: 222,
    },
    {
      id: 2,
      name: "Thulladha Manamum Thullum",
      description: "A struggling singer feels guilty about a girl man.",
      actors: ["Vijay", "Simran", "Manivannan"],
      imgUrl: "sample2.jpg",
      likes: 432,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render the loader while fetching movies", () => {
    (getAllMovies as jest.Mock).mockResolvedValueOnce(mockMovies);
    render(<AllMovies />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("should fetch and display movies after loading", async () => {
    (getAllMovies as jest.Mock).mockResolvedValueOnce(mockMovies);

    render(<AllMovies />);

    await waitFor(() => {
      expect(screen.getByText(mockMovies[1].name)).toBeInTheDocument();
    });
  });

  test("should handle movie selection", async () => {
    (getAllMovies as jest.Mock).mockResolvedValueOnce(mockMovies);

    render(<AllMovies />);

    await waitFor(() => {
      const movieTitle = screen.getByText(mockMovies[1].name);
      fireEvent.click(movieTitle);
      expect(screen.getByText(mockMovies[1].name)).toBeInTheDocument();
    });
  });

  test("should handle movie like functionality", async () => {
    (getAllMovies as jest.Mock).mockResolvedValueOnce(mockMovies);
    render(<AllMovies />);
    await waitFor(() => {
      const likeButton = screen.getAllByTestId("thumbs-up")[0]; 
      expect(screen.getAllByText(/222/)[1]).toBeInTheDocument(); 
      fireEvent.click(likeButton);
      expect(likeButton).toBeInTheDocument(); 
    });
  });
});
