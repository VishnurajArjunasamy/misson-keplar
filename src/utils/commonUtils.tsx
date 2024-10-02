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
    restaurant.type.map((type) => types.add(type.split("-").join(" ")))
  );
  return types;
};

export function formatDate(date: Date): string {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Function to get the ordinal suffix (st, nd, rd, th)
  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return "th"; // Special case for 11th, 12th, 13th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;

  return `${dayWithSuffix} ${month}, ${year}`;
}

export function getTimeofDay(time: string): string {
  const hours = Number(time.split(":")[0]);
  if (hours >= 5 && hours < 12) {
    return "Morning";
  } else if (hours >= 12 && hours < 17) {
    return "Afternoon";
  } else if (hours >= 17 && hours < 21) {
    return "Evening";
  } else {
    return "Night";
  }
}
