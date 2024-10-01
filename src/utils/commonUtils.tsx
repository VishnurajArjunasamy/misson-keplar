import { DishResIF, RestaurantIF } from "../types/restaurantType";

export const isEqual = (path: string, currentPath: string): boolean => {
  return path.includes(currentPath);
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

export const getAvailableRestaurants = (
  restaurants: RestaurantIF[]
): string[] => {
  const availableRestaurants: string[] = [];
  restaurants.forEach((restaurant) =>
    availableRestaurants.push(restaurant.name)
  );
  return availableRestaurants;
};

export const getAvailableCategory = (restaurants: RestaurantIF[]) => {
  const dishes: DishResIF = {};
  restaurants.forEach((restaurant) => {
    restaurant.cuisine.forEach((dish) => {
      if (Object.prototype.hasOwnProperty.call(dishes, dish)) {
        dishes[dish].push(restaurant.name);
      } else {
        dishes[dish] = [restaurant.name];
      }
    });
  });
  dishes["ALL"] = getAvailableRestaurants(restaurants);
  return dishes;
};

export const getFoodTypes = (restaurants: RestaurantIF[]) => {
  const types = new Set();
  restaurants.forEach((restaurant) =>
    restaurant.type.map((type) => types.add(type.split('-').join(' ')))
  );
  return types;
};
