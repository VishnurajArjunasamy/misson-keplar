import axios from "axios";
import { getAllMovies } from "./getAllMovies"; 
import { ALL_MOVIES_URL } from "../../constants/url-constants"; 

jest.mock("axios");

describe("getAllMovies Service", () => {
  const mockMoviesData = [
    { id: 1, title: "Movie 1", likes: 10, liked: false },
    { id: 2, title: "Movie 2", likes: 20, liked: true },
    { id: 3, title: "Movie 3", likes: 30, liked: false },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch movie data successfully", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockMoviesData });
    const result = await getAllMovies();
    expect(result).toEqual(mockMoviesData);
    expect(axios.get).toHaveBeenCalledWith(ALL_MOVIES_URL);
  });

  it("should throw an error when the API request fails", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("Failed to fetch movies"));
    try {
      await getAllMovies();
    } catch (error) {
      expect(error).toEqual(new Error("Failed to fetch movies"));
    }
    expect(axios.get).toHaveBeenCalledWith(ALL_MOVIES_URL);
  });
});
