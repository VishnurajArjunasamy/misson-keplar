import { LOGIN } from "../constants/app-constants";

export const validate = (formCreds) => {
  const errors = {};

  if (!(formCreds.email && LOGIN.FORM.EMAIL.REGEX.test(formCreds.email))) {
    errors.email = LOGIN.FORM.EMAIL.ERRMSG;
  }

  if (
    !(formCreds.password && LOGIN.FORM.PASSWORD.REGEX.test(formCreds.password))
  ) {
    errors.password = LOGIN.FORM.PASSWORD.ERRMSG;
  }
  return errors;
};
