import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import { MENUS } from "./constants/app-constants";
import { SESSION } from "./constants/app-constants";
import { Login } from "./pages/login/login";

const { HOME, ALLMOVIES, NOWSHOWING } = MENUS;
const { LOGIN, LOGOUT } = SESSION;

function App() {
  return (
    <>
      <Routes>
        <Route element={<Navbar />}>
          <Route path={HOME.ROUTE} element={<h1>HOME</h1>} />
          <Route path={ALLMOVIES.ROUTE} element={<h1>ALL MOVIES</h1>} />
          <Route path={LOGIN.ROUTE} element={<Login />} />
          <Route path={NOWSHOWING.ROUTE} element={<h1>SHOW TIME</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
