import { div } from "framer-motion/client"
import { NavBar } from "../../components/navbars/Navbar.jsx"
import { Content } from "../../components/dashboards/Content.jsx"

export const DashboardPage = () => {

    return(
        <div>
            <NavBar/>
            <Content/>
        </div>
    )
}