export const NAVBAR = {
  SHOP_NAME: "DINEDASH",
  MENU: [
    {
      name: "HOME",
      path: "/home",
    },
    {
      name: "RESTAURANTS",
      path: "/restaurants",
    },
    {
      name: "RESERVE A TABLE",
      path: "/reserve",
    },
  ],
};

export const RESERVE = {
  FORM_ERRORS: {
    FIRST_NAME_REQ: "First name is required",
    LAST_NAME_REQ: "Last name is required",
    EMAIL_ERR: "Should be a valid email",
    MOBILE_ERR: "Should be a valid Mobile number",
    DATE_ERR: {
      REQUIRED: "Booking date required",
      VALID: "Booking Date must not be a past date",
    },
    TIME_ERR: "Booking time required",
    PREFERENCE_ERR: "Choose a preference",
    CATEGORY_ERR: "Dish type is required",
    RES_ERR: "Restaurant  is required",
    NO_OF_PS: {
      REQUIRED: "No of persons is required",
      VALID: "No of persons should be less than 100",
    },
  },
  MOBILE_REGEX: /^[7-9][0-9]{9}$/,
  EMAIL_REGEX: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  ORDER_FORM: {
    FIRST_NAME: {
      label: "First name",
      key: "firstName",
    },
    LAST_NAME: {
      label: "Last name",
      key: "lastName",
    },
    EMAIL: {
      label: "Email address",
      key: "email",
    },
    MOBILE: {
      label: "Mobile number",
      key: "mobile",
    },
    DATE: {
      label: "Date you want to book",
      key: "date",
    },
    TIME: {
      label: "Time",
      key: "time",
    },
    PREFERENCE: {
      label: "Choose your preference",
      key: "preference",
    },
    CATEGORY: {
      label: "Choose a catrgory",
      key: "category",
    },
    RESTAURANT: {
      label: "Choose a restaurant",
      key: "restaurant",
    },
    PERSONS: {
      label: "No of persons",
      key: "totalPersons",
    },
    RESERVE_TABLE: "RESERVE MY TABLE",
  },
  ORDER_CONFIRM: {
    STRING_ONE: "We have reserved a table for",
    STRING_TWO: "at the",
    STRING_THREE: "for the",
    STRING_FOUR: "of ",
    STRING_FIVE:
      ". You will receive an email and a text message with the details.",
    STRING_SIX: "For cancellation or further queries contact the restaurants",
  },
};
