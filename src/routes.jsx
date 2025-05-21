import { DashboardPage } from "./pages/dashboard/DashboardPage.jsx"
import { Routes, Route, Navigate } from "react-router-dom";
import ServicesPage from "./pages/ServicesPage.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<ServicesPage />} />
        </Routes>
    );
};

export default AppRoutes;