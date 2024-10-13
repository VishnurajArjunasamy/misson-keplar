import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories">
          <Route path="categoryId" />
        </Route>
      </Routes>
    </>
  );
}

export default App;
