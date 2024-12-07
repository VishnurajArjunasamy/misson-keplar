import axios from "axios";
import { ALL_MOVIES_URL } from "../../constants/url-constants";
import { AllMoviesIF } from "../../modals/allMoviesModal";

/**
 *
 * @param pageNo
 * @returns Array of Movies Data
 */
export const getAllMovies = async (): Promise<AllMoviesIF[]> => {
  const response = await axios.get<AllMoviesIF[]>(ALL_MOVIES_URL);
  return response.data;
};
