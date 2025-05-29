import {  useNavigate, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import {jwtDecode} from 'jwt-decode';
import { useEffect } from "react";


export const ReservationForm = ({ mode = 'create'}) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {register,handleSubmit, setValue,formState: {errors}} = useForm();

    useEffect(() => {
        const token = localStorage.getItem('x-token');
        if (token) {
            try {
                const decode = jwtDecode(token);
                setValue('guest', decode.uid);
            } catch (err) {
                console.error('Error al decodificar token', err);
            }
        }

        setValue('rooms', id);
    }, [id,setValue])

    const onSubmit = (datos) => {
        console.log(datos)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('checkIn', { required: true})} placeholder="Check In Date" />
            {errors.checkIn && <span >The check in date is required</span>}

            <input {...register('checkOut', {required: true})} placeholder="Check Out Date" />
            {errors.checkOut && <span >The check out date is required</span>}
            
            <input type="hidden"  {...register('guest', {required: true})} />
            <input type="hidden"  {...register('rooms',{required: true})}/>
            
            <button type="submit"> Enviar </button>
        </form>
    )
}