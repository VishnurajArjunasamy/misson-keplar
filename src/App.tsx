import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
// import Home from "./pages/home/home.js";
import Navbar from "./components/navbar/navbar.js";
// import Shopping from "./pages/shopping/shopping.js";
// import OrderConfirm from "./pages/order-confirm/order-confirm.js";
import { ROUTE } from "./constants/route.constants.js";
import NotFound from "./components/not-found/not-found.js";
import { lazy, Suspense } from "react";
import Loader from "./components/loader/loader.js";

const Home = lazy(() => import("./pages/home/home.js"));
const Shopping = lazy(() => import("./pages/shopping/shopping.js"));
const OrderConfirm = lazy(
  () => import("./pages/order-confirm/order-confirm.js")
);

function App() {
  return (
    <>
      <Routes>
        <Route element={<Navbar />}>
          <Route
            path={`/${ROUTE.HOME}`}
            element={
              <Suspense fallback={<Loader />}>
                <Home />
              </Suspense>
            }
          />
          <Route path={`/${ROUTE.CATEGORIES}`}>
            <Route index element={<Navigate to={`/${ROUTE.HOME}`} />} />
            <Route
              path={`:${ROUTE.CATEGORY_ID}`}
              element={
                <Suspense fallback={<Loader />}>
                  <Shopping />
                </Suspense>
              }
            />
          </Route>
          <Route
            path={`/${ROUTE.CONFIRM_ORDER}`}
            element={
              <Suspense fallback={<Loader />}>
                <OrderConfirm />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
