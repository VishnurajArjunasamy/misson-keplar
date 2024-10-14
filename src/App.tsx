import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home.js";
import Header from "./components/header/header.js";
import Shopping from "./pages/home/shopping/shopping.js";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories">
            <Route path=":categoryId" element={<Shopping />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
