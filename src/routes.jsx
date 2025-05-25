import { DashboardPage } from "./pages/dashboard/DashboardPage.jsx";
import { HotelsPage } from "./pages/HotelsPage.jsx";
import { UsersPage } from "./pages/UsersPage.jsx"; 
import { LoginPage } from "./pages/LoginPage.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";

const routes = [
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/dashboard/*', element: <DashboardPage /> }, // ← nota el asterisco
  { path: '/users/*', element: <UsersPage /> },
  { path: '/hotels/*', element: <HotelsPage /> },
];

export default routes;
