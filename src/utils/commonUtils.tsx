import { RestaurantIF } from "../models/restaurantModel";
import { DishResIF } from "../models/dishModel";
import { RESERVE } from "../constants/app.constants";

const { MOBILE_REGEX, EMAIL_REGEX, FORM_ERRORS } = RESERVE;

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

function isValidDate(selectedDate) {
  const currentDate = new Date().setHours(0, 0, 0, 0);
  const givenDate = new Date(selectedDate);

  if (givenDate >= currentDate) {
    return true;
  }
  return false;
}

export function validate(formData) {
  const errors = {};
  if (!formData.firstName) {
    errors.firstName = FORM_ERRORS.FIRST_NAME_REQ;
  }

  if (!formData.lastName) {
    errors.lastName = FORM_ERRORS.LAST_NAME_REQ;
  }

  if (!(formData.email && EMAIL_REGEX.test(formData.email))) {
    errors.email = FORM_ERRORS.EMAIL_ERR;
  }

  if (!(formData.mobile && MOBILE_REGEX.test(formData.mobile))) {
    errors.mobile = FORM_ERRORS.MOBILE_ERR;
  }

  if (!formData.date) {
    errors.date = FORM_ERRORS.DATE_ERR.REQUIRED;
  } else if (!isValidDate(formData.date)) {
    errors.date = FORM_ERRORS.DATE_ERR.VALID;
  }

  if (!formData.time) {
    errors.time = FORM_ERRORS.TIME_ERR;
  }

  if (!formData.veg && !formData.nonVeg) {
    errors.preference = FORM_ERRORS.PREFERENCE_ERR;
  }

  if (!formData.category) {
    errors.category = FORM_ERRORS.CATEGORY_ERR;
  }

  if (!formData.restaurant) {
    errors.restaurant = FORM_ERRORS.RES_ERR;
  }

  if (!formData.totalPersons) {
    errors.totalPersons = FORM_ERRORS.NO_OF_PS.REQUIRED;
  } else if (formData.totalPersons > 100) {
    errors.totalPersons = FORM_ERRORS.NO_OF_PS.VALID;
  }

  return errors;
}
