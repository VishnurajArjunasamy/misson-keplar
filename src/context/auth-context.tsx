import { createContext, ReactNode, useContext, useState } from "react";
import { AuthIF } from "../modals/authModal";



const AuthContext = createContext({} as AuthIF);

interface AuthPropIF {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthPropIF) => {
  const [user, setUser] = useState<string | null>(
    localStorage.getItem("user") || null
  );

  const saveUser = (user: string) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, saveUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
