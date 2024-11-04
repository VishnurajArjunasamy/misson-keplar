const creds = {
  email: "vish@gmail.com",
  password: "qwertyuiop",
};

interface LoginServiceIF {
  email: string;
  password: string;
}

export const loginService = ({ email, password }: LoginServiceIF) => {
    console.log('here');
    
  if (email == creds.email && password == creds.password) {
    return true;
  }

  return "Invalid Username or Password";
};
