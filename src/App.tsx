import "./App.css";
import NavBar from "./components/navbar/navbar.js";
import Home from "./pages/home/home.js";
import { Route, Routes } from "react-router-dom";
import Restaurant from "./pages/restaurant/restaurant.js";
import Reserve from "./pages/reserve/reserve.js";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route element={<NavBar />}>
          {/* <Route index element={} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<Restaurant />} />
          <Route path="/reserve" element={<Reserve />} />
        </Route>
        {/* <Route path="*" element={<h1>Not Found</h1>} /> */}
      </Routes>
    </>
  );
}

export default App;
