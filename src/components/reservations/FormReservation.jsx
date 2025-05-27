import {  useNavigate, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';



export const ReservationForm = ({ mode = 'create'}) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {register,handleSubmit,formState: {errors}} = useForm();

    const onSubmit = (datos) => {
        console.log(datos)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('checkIn', { required: true})} placeholder="Check In Date" />
            {errors.checkIn && <span >The check in date is required</span>}

            <input {...register('checkOut', {required: true})} placeholder="Check Out Date" />
            {errors.checkOur && <span >The check out date is required</span>}

            
        </form>
    )
}