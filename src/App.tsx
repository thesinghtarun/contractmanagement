import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import DetailsPage from "./pages/DetailsPage";
import FormPage from "./pages/FormPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/details/:type" element={<DetailsPage />} />
      <Route path="/form/:type" element={<FormPage />} />
    </Routes>
  );
};

export default App;
