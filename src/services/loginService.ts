const creds = {
  email: "vish@gmail.com",
  password: "qwertyuiop",
  userName: "Vizz",
};

interface LoginServiceIF {
  email: string;
  password: string;
}

export const loginService = ({ email, password }: LoginServiceIF) => {
  if (email == creds.email && password == creds.password) {
    return creds.userName;
  }

  throw new Error("Invalid Username or Password");
};
