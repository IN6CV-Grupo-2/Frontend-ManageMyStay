import { DashboardPage } from "./pages/dashboard/DashBoardPage";
import { UserList } from "./components/users/UserList";
import { UserDetails } from "./components/users/UserDetails";
import { UserForm } from "./components/users/UserForm";

const routes = [
    { path: "/users", element: <UserList /> },
    { path: "/users/:id", element: <UserDetails /> },
    { path: "/users/edit/:id", element: <UserForm /> },
    { path: "/*", element: <DashboardPage /> },
];

export default routes;