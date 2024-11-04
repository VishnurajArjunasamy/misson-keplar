import axios, { AxiosResponse } from "axios";
import { ShortTeasersIF } from "../modals/teaserModal";
import { SHORT_TEASERS_URL } from "../constants/url-constants";

/**
 *
 * @returns array of short teasers
 */
export const getShortTeasers = async (): Promise<ShortTeasersIF[]> => {
  const response = await axios.get<ShortTeasersIF[]>(SHORT_TEASERS_URL);
  return response.data;
};
