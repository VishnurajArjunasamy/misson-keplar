import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import NotFound from "./components/not-found/not-found";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default App;
