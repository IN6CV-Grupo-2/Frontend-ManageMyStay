import { Box, Stack, Badge, Heading, Button, FormControl, FormLabel, FormErrorMessage, useToast, VStack, Center, Container, useColorModeValue } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import {jwtDecode} from 'jwt-decode'; 
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { createReservation, getReservationById, updateReservation } from "../../services/reservationService";
import 'react-datepicker/dist/react-datepicker.css';

export const ReservationForm = ({ mode = 'create' }) => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm();
    const toast = useToast();
    const [reservationData, setReservationData] = useState(null);
    const cardBg = useColorModeValue("#F9F7F2", "#2E2A29");
    const meddleBg = "linear-gradient(135deg, #2E576A 0%, #B8807C 60%, #7BC2C4 100%)";

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

        if (mode === 'create') {
            setValue('room', id); 
        } else if (mode === 'edit') {
            const loadReservation = async () => {
                try {
                    const data = await getReservationById(id);
                    if (data && data.reservation) {
                        setReservationData(data.reservation);
                        setValue('checkIn', new Date(data.reservation.checkIn));
                        setValue('checkOut', new Date(data.reservation.checkOut));
                        // Si decides manejar service, descomenta la siguiente línea
                        // setValue('service', data.reservation.service);
                        setValue('guest', data.reservation.guest._id);
                        setValue('room', data.reservation.room?._id || data.reservation.room); // Cambiado a 'room'
                    }
                } catch (e) {
                    console.error("Error cargando reserva:", e);
                }
            };
            loadReservation();
        }
    }, [id, setValue, mode]);

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            for (const field in errors) {
                toast({
                    title: `Error en ${field}`,
                    description:
                        errors[field].type === 'required'
                            ? 'This field is required'
                            : 'Error in the field',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    }, [errors, toast]);

    const onSubmit = async (datos) => {
        // Validar fechas (opcional)
        if (new Date(datos.checkOut) <= new Date(datos.checkIn)) {
            toast({
                title: "Fechas inválidas",
                description: "La fecha de salida debe ser posterior a la de entrada",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            return;
        }

        try {
            if (mode === 'create') {
                await createReservation(datos);
                toast({ title: "Reserva creada correctamente", status: "success" });
            } else {
                await updateReservation(id, datos); 
                toast({ title: "Reserva actualizada correctamente", status: "success" });
            }
            navigate("/reservations");
        } catch (error) {
            console.error("Error al enviar reserva:", error);
            toast({
                title: "Error al procesar la reserva",
                description: error.message || "Error inesperado",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }
    };

    return (
        <Center minH="100vh" bg={meddleBg}>
            <Container maxW="md" p={8} rounded="lg" shadow="lg" bg={cardBg}>
                <VStack spacing={6} align="stretch">
                    <Heading textAlign="center" size="lg">
                        {mode === 'edit' ? 'Edit Reservation' : 'Hotel Room Reservation'}
                    </Heading>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack spacing={5}>
                            <FormControl isInvalid={errors.checkIn}>
                                <FormLabel>Check In</FormLabel>
                                <Controller
                                    control={control}
                                    name="checkIn"
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <DatePicker
                                            placeholderText="Select check-in date"
                                            selected={field.value}
                                            onChange={(date) => field.onChange(date)}
                                            dateFormat="yyyy-MM-dd"
                                            minDate={new Date()}
                                            className="chakra-input"
                                        />
                                    )}
                                />
                                <FormErrorMessage>Check-in date is required</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.checkOut}>
                                <FormLabel>Check Out</FormLabel>
                                <Controller
                                    control={control}
                                    name="checkOut"
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <DatePicker
                                            placeholderText="Select check-out date"
                                            selected={field.value}
                                            onChange={(date) => field.onChange(date)}
                                            dateFormat="yyyy-MM-dd"
                                            minDate={new Date()}
                                            className="chakra-input"
                                        />
                                    )}
                                />
                                <FormErrorMessage>Check-out date is required</FormErrorMessage>
                            </FormControl>


                            <input type="hidden" {...register("guest", { required: true })} />
                            <input type="hidden" {...register("room", { required: true })} /> {/* Cambiado a "room" */}

                            <Button type="submit" colorScheme="purple" w="full">
                                {mode === 'edit' ? 'Actualizar Reserva' : 'Enviar'}
                            </Button>
                        </VStack>
                    </form>
                </VStack>
            </Container>
        </Center>
    );
};
