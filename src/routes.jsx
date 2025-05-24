import { DashboardPage } from "./pages/dashboard/DashBoardPage"
import { LoginPage } from "./pages/login/LoginPage.jsx";

const routes = [
    { path: '/login', element: <LoginPage /> },
    {path: '/*', element: <DashboardPage/>}
]

export default routes;