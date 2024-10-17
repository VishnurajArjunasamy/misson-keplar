import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home.js";
import Navbar from "./components/navbar/navbar.js";
import Shopping from "./pages/shopping/shopping.js";
import OrderConfirm from "./pages/order-confirm/order-confirm.js";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories">
            <Route path=":categoryId" element={<Shopping />} />
          </Route>
          <Route path="/confirmOrder" element={<OrderConfirm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
