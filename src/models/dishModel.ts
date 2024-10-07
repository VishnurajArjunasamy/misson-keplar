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