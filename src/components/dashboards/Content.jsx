import { Route, Routes } from "react-router-dom";
import { PrincipalPage } from "./PrincipalPage.jsx";
import  EditOwnProfileForm  from '../../components/users/EditOwnProfileForm.jsx';
import { Box } from "@chakra-ui/react";
import UsersPage from "../../pages/user/UsersPage.jsx";
import HotelsPage from "../../pages/hotel/HotelsPage.jsx";
import RoomsPage from "../../pages/rooms/RoomsPage.jsx";
export const Content = () => {
    return(

        <Box 
        minH="100vh" 
        w="100vw" 
        p={4} 
        boxSizing="border-box"
        overflow='hidden'>
            <Routes>
                <Route path="/" element={<PrincipalPage />} />
                <Route path="/edit-profile" element={<EditOwnProfileForm />} />
                <Route path="/users/*" element={<UsersPage/>}/>
                <Route path="/hotels/*" element={<HotelsPage/>}/>
                <Route path="/rooms/:id/*" element={<RoomsPage/>}/>
            </Routes>
        </Box>
    )
}
