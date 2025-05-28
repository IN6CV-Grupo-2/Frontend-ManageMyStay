
import { Route,Routes } from "react-router-dom";0
import ServicesPage from "../../pages/ServicesPage.jsx";
import BillPage from "../../pages/BillPage.jsx"
import { PrincipalPage } from "./PrincipalPage";
export const Content = () => {
    return(
        <div>
            <Routes>
                <Route path="/" element={<PrincipalPage/>}/>
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/bills" element={<BillPage />} />
            </Routes>
        </div>
    )
}