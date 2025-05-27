import { Navbar } from "../../components/navbars/Navbar.jsx"
import { Content } from "../../components/dashboards/Content.jsx"
import Footer from "../../components/dashboards/Footer.jsx"

export const DashboardPage = () => {

    return(
        <div>
            <Navbar/>
            <Content/>
            <Footer/>
        </div>
    )
}