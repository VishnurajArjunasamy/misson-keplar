import { RestaurantIF } from "../types/restaurantType";

export const isEqual = (path: string, currentPath: string): boolean => {
  return path === currentPath;
};

export const getRestaurant = (
  id: number,
  restaurants: RestaurantIF[]
): RestaurantIF | undefined => {
  const restaurant = restaurants.find((restaurant) => {
    return restaurant.id === id;
  });
  return restaurant;
};
