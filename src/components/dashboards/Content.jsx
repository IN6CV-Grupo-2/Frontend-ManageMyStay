
import { Route,Routes } from "react-router-dom";
import { PrincipalPage } from "./PrincipalPage";
export const Content = () => {
    return(
        <div>
            <Routes>
                <Route path="/" element={<PrincipalPage/>}/>
            </Routes>
        </div>
    )
}