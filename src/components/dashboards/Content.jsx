
import { Route,Routes } from "react-router-dom";
import { PrincipalPage } from "./PrincipalPage";
import { Box } from "@chakra-ui/react";
export const Content = () => {
    return(

        <Box 
        minH="100vh" 
        w="100vw" 
        p={4} 
        boxSizing="border-box"
        overflow='hidden'>
            <Routes>
                <Route path="/" element={<PrincipalPage/>}/>
            </Routes>
        </Box>
    )
}