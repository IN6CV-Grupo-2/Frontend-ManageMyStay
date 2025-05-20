import { useNavigate } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
  } from '@chakra-ui/react'
import { DrawerButton } from './Drawer.jsx';
export const NavBar = () => {

    return(
        <Breadcrumb separator='-' w="100vw">
            <BreadcrumbItem>
                <BreadcrumbLink href='#'>Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink href='#'>Hotels</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href='#'>Events</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <DrawerButton/>
            </BreadcrumbItem>
        </Breadcrumb>
    )
}