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
    return { status: "success", user: creds.userName };
  }

  return { status: "fail", message: "Invalid Username or Password" };
};
