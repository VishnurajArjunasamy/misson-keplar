import { useAuth } from "../context/auth-context";
import { SESSION } from "../constants/app-constants";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? (
    children
  ) : (
    <Navigate replace={true} to={`/${SESSION.LOGIN.ROUTE}`} />
  );
};

export default PrivateRoute;
