import { NavBar } from "../../components/navbars/Navbar.jsx"
import { Content } from "../../components/dashboards/Content.jsx"
import Footer from "../../components/dashboards/Footer.jsx"

export const DashboardPage = () => {

    return(
        <div>
            <NavBar/>
            <Content/>
            <Footer/>
        </div>
    )
}