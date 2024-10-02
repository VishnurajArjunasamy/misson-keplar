export interface Poster {
    imageSrc: string;
    description: string;
  }

  export interface PosterResponse{
    data:Poster[]
  }

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

export interface Dish{
  id:string,
  name:string,
  imageSrc:string,
  description:string,
  Price:string
}

export interface DishResIF {
  [key: string]: string[];
}

export interface OrderIF{
  firstName: string,
    lastName: string,
    email: string,
    mobile: string,
    date: string,
    time: string,
    preference: {
      veg: boolean,
      nonVeg: boolean,
    },
    category: string,
    restaurant: string,
    totalPersons: number,
}