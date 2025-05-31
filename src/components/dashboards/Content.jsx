import { Route, Routes } from "react-router-dom";
import { PrincipalPage } from "./PrincipalPage.jsx";
import  EditOwnProfileForm  from '../../components/users/EditOwnProfileForm.jsx';
import { Box } from "@chakra-ui/react";
import UsersPage from "../../pages/user/UsersPage.jsx";
import HotelsPage from "../../pages/hotel/HotelsPage.jsx";
import RoomsPage from "../../pages/rooms/RoomsPage.jsx";
import { ReservationsPage } from "../../pages/reservations/ReservationsPage.jsx";
import {ReservationForm} from '../../components/reservations/FormReservation.jsx';
import ServicesPage from "../../pages/ServicesPage.jsx";
import BillPage from "../../pages/BillPage.jsx";
import  EventsPage  from "../../pages/event/EventsPage.jsx";
import EventDetails from "../../pages/event/EventDetails.jsx";
import EventFormUpdate from "../../pages/event/EventFormUpdate.jsx";

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
                <Route path="/reservations/create/:id" element={<ReservationForm mode={'create'}/>}/>
                <Route path="/reservations/*" element={<ReservationsPage/>}/>
                <Route path="/reservations/edit/:id" element={<ReservationForm mode={'edit'} />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/bills" element={<BillPage />} />
                <Route path="/events" element={<EventsPage/>}/>
                <Route path="/events/:id" element={<EventDetails/>}/>
                <Route path="/events/update/:id" element={<EventFormUpdate/>}/>
            </Routes>
        </Box>
    )
}
