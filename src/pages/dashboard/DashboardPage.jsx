import { div } from "framer-motion/client"
import { Navbar } from "../../components/navbars/Navbar.jsx"
import { Content } from "../../components/dashboards/Content.jsx"

export const DashboardPage = () => {

    return(
        <div>
            <Navbar/>
            <Content/>
        </div>
    )
}