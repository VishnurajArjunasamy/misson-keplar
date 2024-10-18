import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home.js";
import Navbar from "./components/navbar/navbar.js";
import Shopping from "./pages/shopping/shopping.js";
import OrderConfirm from "./pages/order-confirm/order-confirm.js";
import { ROUTE } from "./constants/route.constants.js";
import NotFound from "./components/not-found/not-found.js";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Navbar />}>
          <Route path={`/${ROUTE.HOME}`} element={<Home />} />
          <Route path={`/${ROUTE.CATEGORIES}`}>
            <Route index element={<Navigate to={`/${ROUTE.HOME}`} />} />
            <Route path={`:${ROUTE.CATEGORY_ID}`} element={<Shopping />} />
          </Route>
          <Route path={`/${ROUTE.CONFIRM_ORDER}`} element={<OrderConfirm />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
