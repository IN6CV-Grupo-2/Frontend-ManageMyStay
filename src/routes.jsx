import { DashboardPage } from "./pages/dashboard/DashboardPage.jsx";
import { LoginPage } from "./pages/login/LoginPage.jsx";
import { RegisterPage } from "./pages/register/RegisterPage.jsx";
import  EventsPage  from "./pages/event/EventsPage.jsx";
import EventDetails from "./pages/event/EventDetails.jsx";
import EventFormUpdate from "./pages/event/EventFormUpdate.jsx";



const routes = [
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/*', element: <DashboardPage /> }, // ← nota el asterisco
];

export default routes;
