import { DashboardPage } from "./pages/dashboard/DashBoardPage"
import { LoginPage } from "./pages/login/LoginPage.jsx";
import { RegisterPage } from "./pages/register/RegisterPage.jsx";

const routes = [
    {path: '/login', element: <LoginPage /> },
    {path:"/register", element: <RegisterPage />} ,
    {path: '/*', element: <DashboardPage/>}
]

export default routes;