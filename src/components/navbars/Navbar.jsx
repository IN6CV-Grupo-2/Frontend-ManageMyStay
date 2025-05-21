import { useNavigate } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    Spacer,
    Image,
    Box
  } from '@chakra-ui/react'
import { DrawerButton } from './Drawer.jsx';
export const NavBar = () => {

    return(
       <Flex
        w="100%"
        p={4}
        bg="gray.50"
        boxShadow="sm"
        align="center"     
        justify="start" 
       >
        <Box>
            <Image src="../../../public/assests/images/LogoManageMyStay.jpg" alt="Logo Manage My Stay"
                w="250px"
            ></Image>
        </Box>
            <Breadcrumb separator='-' fontWeight='medium' fontSize='xl' color="gray.600">
                <BreadcrumbItem>
                    <BreadcrumbLink href='#'>Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink href='#'>Hotels</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink href='#'>Events</BreadcrumbLink>
                </BreadcrumbItem>

            </Breadcrumb>
            <Spacer/>
            <DrawerButton/>
       </Flex> 
    )
}