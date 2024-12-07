import { validate } from "./formUtils";
import { LOGIN } from "../constants/app-constants";

describe("validate function", () => {

  it("returns no errors for valid email and password", () => {
    const formCreds = { email: "test@example.com", password: "Password1" };
    const result = validate(formCreds);
    expect(result).toEqual({});
  });

  it("returns an error for an invalid email", () => {
    const formCreds = { email: "invalid-email", password: "Password1" };
    const result = validate(formCreds);
    expect(result).toEqual({ email: LOGIN.FORM.EMAIL.ERRMSG });
  });

  it("returns an error for an invalid password", () => {
    const formCreds = { email: "test@example.com", password: "short" };
    const result = validate(formCreds);
    expect(result).toEqual({ password: LOGIN.FORM.PASSWORD.ERRMSG });
  });

  it("returns errors for both invalid email and password", () => {
    const formCreds = { email: "invalid-email", password: "short" };
    const result = validate(formCreds);
    expect(result).toEqual({
      email: LOGIN.FORM.EMAIL.ERRMSG,
      password: LOGIN.FORM.PASSWORD.ERRMSG,
    });
  });

  it("returns errors if email or password is empty", () => {
    const formCreds = { email: "", password: "" };
    const result = validate(formCreds);
    expect(result).toEqual({
      email: LOGIN.FORM.EMAIL.ERRMSG,
      password: LOGIN.FORM.PASSWORD.ERRMSG,
    });
  });
});
