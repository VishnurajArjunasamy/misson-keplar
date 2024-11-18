import { Route, Routes } from "react-router-dom";
import Navbar from "./containers/navbar/navbar";
import { MENUS } from "./constants/app-constants";
import { SESSION } from "./constants/app-constants";
import Login from "./pages/login/login";
import Home from "./pages/home/ home";
import NowShowing from "./pages/now-showing/now-showing";
import { AuthProvider } from "./context/auth-context";
import PrivateRoute from "./helper/privateRoute";
import AllMovies from "./pages/all-movies/all-movies";

const { HOME, ALLMOVIES, NOWSHOWING } = MENUS;
const { LOGIN } = SESSION;

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Navbar />}>
          <Route path={HOME.ROUTE} element={<Home />} />
          <Route path={ALLMOVIES.ROUTE} element={<AllMovies />} />
          <Route path={LOGIN.ROUTE} element={<Login />} />
          <Route
            path={NOWSHOWING.ROUTE}
            element={
              <PrivateRoute>
                <NowShowing />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<h1>You lost?</h1>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
