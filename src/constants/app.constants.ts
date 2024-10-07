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
