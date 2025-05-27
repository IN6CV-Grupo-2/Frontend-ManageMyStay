import { useState } from "react";
import toast from 'react-router-dom';
import { searchReservations as searchReservationRequest } from "../../services";

export const useReservationDetails = () => {
    const [reservationDetails, setReservationDetails] = useState({});

    const getReservationDetails = async (id) => {
        const responseData = await searchReservationRequest(id);

        if(responseData.error){
            return toast.error(
                responseData.e?.response?.data || 'Error to search the reservation'
            )
        }else {
            setReservationDetails(responseData.data.reservation)
        }
    }

    return {
        reservationDetails,
        getReservationDetails
    }
}