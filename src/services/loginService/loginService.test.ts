import { loginService } from "./loginService";  

describe("loginService", () => {
  const creds = {
    email: "vish@gmail.com",
    password: "qwertyuiop",
    userName: "Vizz",
  };

  it("should return success when email and password match", () => {
    const response = loginService({
      email: creds.email,
      password: creds.password,
    });

    expect(response).toEqual({
      status: "success",
      user: creds.userName,
    });
  });

  it("should return fail when email does not match", () => {
    const response = loginService({
      email: "incorrect_email@gmail.com", 
      password: creds.password,
    });

    expect(response).toEqual({
      status: "fail",
      message: "Invalid Username or Password",
    });
  });

  it("should return fail when password does not match", () => {
    const response = loginService({
      email: creds.email,
      password: "incorrectPassword",  
    });

    expect(response).toEqual({
      status: "fail",
      message: "Invalid Username or Password",
    });
  });

  it("should return fail when both email and password do not match", () => {
    const response = loginService({
      email: "incorrect_email@gmail.com",
      password: "incorrectPassword",  
    });
    
    expect(response).toEqual({
      status: "fail",
      message: "Invalid Username or Password",
    });
  });
});
