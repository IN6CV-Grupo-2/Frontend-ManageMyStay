import { DashboardPage } from "./pages/dashboard/DashBoardPage"
import { PrincipalPage } from "./components/dashboards/PrincipalPage";
import RoomsPage from "./pages/rooms/RoomsPage";

const routes = [
  {
    path: '/',
    element: <DashboardPage />,
    children: [
      { path: '', element: <PrincipalPage /> },
      { path: 'rooms', element: <RoomsPage /> }
    ]
  }
];

export default routes;