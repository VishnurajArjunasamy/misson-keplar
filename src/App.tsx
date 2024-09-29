import "./App.css";
import NavBar from "./components/navbar/navbar.js";
import Home from "./pages/home/home.js";
import { Route, Routes } from "react-router-dom";
import Restaurant from "./pages/restaurant/restaurant.js";
import Reserve from "./pages/reserve/reserve.js";
import RestaurantItem from "./components/restaurant-item/restaurant-item.js";

function App() {
  return (
    <>
      <Routes>
        <Route element={<NavBar />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/restaurants" element={<Restaurant />} /> */}
          <Route path="/restaurants">
            <Route index element={<Restaurant />} />
            <Route path=":id" element={<RestaurantItem />} />
          </Route>
          <Route path="/reserve" element={<Reserve />} />
        </Route>
        {/* <Route path="*" element={<h1>Not Found</h1>} /> */}
      </Routes>
    </>
  );
}

export default App;
