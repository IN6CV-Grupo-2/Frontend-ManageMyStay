import { DashboardPage } from "./pages/dashboard/DashboardPage.jsx"
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/login/LoginPage.jsx";
import { RegisterPage } from "./pages/register/RegisterPage.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}></Route>
            <Route path="/register" element={<RegisterPage/>}></Route>
            <Route path="/*" element={<DashboardPage/>} />
        </Routes>
    );
};

export default AppRoutes;