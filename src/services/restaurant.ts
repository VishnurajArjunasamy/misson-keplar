import axios,{AxiosResponse} from "axios";
import { Poster,PosterResponse } from "../types/restaurant";

export async function getPosters():Promise<Poster[]|undefined> {
  try {
    const response:AxiosResponse<PosterResponse> = await axios.get(
      "https://nijin-server.vercel.app/api/dinedash/gallery-images"
    );
    return response.data.data;
  } catch (err) {
     console.log(err);
  }
}
