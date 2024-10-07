import { Dish } from "./dishModel";

export interface RestaurantIF{
  id:number;
  name: string,
  timings: string,
  location: string,
  cuisine: string[],
  rating: number,
  type: string[],
  isCertified: boolean,
  restaurantImageSrc:string
  items:Dish[]
}

export interface RestaurantResponseI{
  data:RestaurantIF[]
}



