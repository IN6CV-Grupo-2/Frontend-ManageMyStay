import { useNavigate } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
  } from '@chakra-ui/react'
import { DrawerButton } from './Drawer.jsx';
export const NavBar = () => {
    const navigate = useNavigate();
    return(
        <Breadcrumb separator='-'>
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
                <BreadcrumbLink onClick={() => navigate('/services')}>Services</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <DrawerButton/>
            </BreadcrumbItem>
        </Breadcrumb>
    )
}