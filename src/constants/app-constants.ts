export const MENUS = {
  HOME: {
    NAME: "HOME",
    ROUTE: "/",
  },
  ALLMOVIES: {
    NAME: "ALL MOVIES",
    ROUTE: "/allMovies",
  },
  NOWSHOWING: {
    NAME: "NOW SHOWING",
    ROUTE: "/showTime",
  },
};

export const SESSION = {
  LOGIN: {
    NAME: "LOGIN",
    ROUTE: "/login",
  },
  LOGOUT: {
    NAME: "LOGOUT",
    ROUTE: "",
  },
};

export const LOGIN = {
  HEADING: "Login",
  MESSAGE:
    "Logging into CineFLEX will give you access to full videos and movies. You can sit back, relax and watch at your home.",
  FORM: {
    EMAIL: {
      NAME: "Email",
      REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      ERRMSG: "Enter a valid email",
    },
    PASSWORD: {
      NAME: "Password",
      REGEX: /^.{7,}$/,
      ERRMSG: "Password must be longer than 6 characters",
    },
  },
};
