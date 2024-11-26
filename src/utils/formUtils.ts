import { LOGIN } from "../constants/app-constants";

export const validate = (formCreds: { email: string; password: string }) => {
  const errors = {} as { email: string; password: string };

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
