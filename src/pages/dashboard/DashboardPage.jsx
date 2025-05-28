import { Navbar } from "../../components/navbars/Navbar.jsx"
import { Content } from "../../components/dashboards/Content.jsx"
import Footer from "../../components/dashboards/Footer.jsx";
import { Outlet } from "react-router-dom";


export const DashboardPage = () => {
  return (
    <div>
            <Navbar/>
            <Content/>
            <Outlet/>
            <Footer/>
    </div>
  );
};

