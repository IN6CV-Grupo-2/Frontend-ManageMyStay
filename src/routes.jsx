import { DashboardPage } from "./pages/dashboard/DashboardPage.jsx"
import { Routes, Route, Navigate } from "react-router-dom";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/*" element={<DashboardPage/>} />
        </Routes>
    );
};

export default AppRoutes;