import axios,{AxiosResponse} from "axios";
import { Poster,PosterResponse } from "../types/restaurantType";

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

export async function getRestaurants (){
  try {
    const response = await axios.get("https://nijin-server.vercel.app/api/dinedash/restaurants")
    return response.data
  } catch (error) {
    console.log(error)
  }
}

