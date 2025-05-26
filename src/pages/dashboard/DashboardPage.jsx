import { div } from "framer-motion/client"
import { Navbar } from "../../components/navbars/Navbar.jsx"
import { Content } from "../../components/dashboards/Content.jsx"
import { Outlet } from "react-router-dom";

export const DashboardPage = () => {

    return(
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    )
}