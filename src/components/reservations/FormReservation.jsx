import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { }


export const ReservationForm = ({ mode = 'create'}) => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        checkIn: '',
        checkOut: '',
        guest: '',
        room: '',
        hotel: ''
    })

    useEffect(()=> {

    })
}