import { Route, Routes } from "react-router-dom";
import Navbar from "./containers/navbar/navbar";
import { MENUS } from "./constants/app-constants";
import { SESSION } from "./constants/app-constants";
import { AuthProvider } from "./context/auth-context";
import PrivateRoute from "./helper/privateRoute";
import React from "react";

const Home = React.lazy(() => import("./pages/home/ home"));
const AllMovies = React.lazy(() => import("./pages/all-movies/all-movies"));
const NowShowing = React.lazy(() => import("./pages/now-showing/now-showing"));
const Login = React.lazy(() => import("./pages/login/login"));

const { HOME, ALLMOVIES, NOWSHOWING } = MENUS;
const { LOGIN } = SESSION;

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Navbar />}>
          <Route
            path={HOME.ROUTE}
            element={
              <React.Suspense fallback={<>Loading..</>}>
                <Home />
              </React.Suspense>
            }
          />
          <Route
            path={ALLMOVIES.ROUTE}
            element={
              <React.Suspense fallback={<>Loading..</>}>
                <AllMovies />
              </React.Suspense>
            }
          />
          <Route
            path={LOGIN.ROUTE}
            element={
              <React.Suspense fallback={<>Loading..</>}>
                <Login />
              </React.Suspense>
            }
          />
          <Route
            path={NOWSHOWING.ROUTE}
            element={
              <PrivateRoute>
                <React.Suspense fallback={<>Loading..</>}>
                  <NowShowing />
                </React.Suspense>
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
