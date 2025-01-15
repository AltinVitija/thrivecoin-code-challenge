import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "../pages/dashboard/DashboardPage";
import DetailsPage from "../pages/details/DetailsPage";
import NotFound from "../pages/404";
import SelectPostMessage from "../components/details/SelectPostMessage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/details" element={<SelectPostMessage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
