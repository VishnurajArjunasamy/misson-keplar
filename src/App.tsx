import { Route, Routes } from "react-router-dom";
import Navbar from "./containers/navbar/navbar";
import { MENUS } from "./constants/app-constants";
import { SESSION } from "./constants/app-constants";
import Login from "./pages/login/login";
import Home from "./pages/home/ home";
import NowShowing from "./pages/now-showing/now-showing";

const { HOME, ALLMOVIES, NOWSHOWING } = MENUS;
const { LOGIN } = SESSION;

function App() {
  return (
    <>
      <Routes>
        <Route element={<Navbar />}>
          <Route path={HOME.ROUTE} element={<Home />} />
          <Route path={ALLMOVIES.ROUTE} element={<h1>ALL MOVIES</h1>} />
          <Route path={LOGIN.ROUTE} element={<Login />} />
          <Route path={NOWSHOWING.ROUTE} element={<NowShowing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
