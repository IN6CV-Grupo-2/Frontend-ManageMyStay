import { useEffect, useState } from "react";
import { SimpleGrid, Box } from "@chakra-ui/react";
import { ReservationCard } from "../../components/reservations/ReservationCard";
import { getReservationByUser, getReservationByHotel,cancelReservation } from "../../services/reservationService";
import { useDecodedAuth } from "../../context/AuthContext";

export const ReservationsPage = () => {
    const [reservations, setReservations] = useState([]);

    const { auth } = useDecodedAuth();
    console.log("AUTH al renderizar:", auth);


    const fetchReservation = async (id) => {
        if (auth.role === "CLIENT_ROLE") {
            const data = await getReservationByUser(id);
            console.log("Respuesta del backend:", data);
            if (!data.error) {
                setReservations(data.reservations);
            } else {
                console.error("Error obteniendo reservas del usuario", data.e?.response?.data || data.e.message);
            }
        } else if (auth.role === "ADMIN_HOTEL_ROLE") {
            const data = await getReservationByHotel();
            if (!data.error) {
                setReservations(data.reservations);
            } else {
                console.error("Error obteniendo reservas del hotel", data.e?.response?.data || data.e.message);
            }
        }
    };


   useEffect(() => {
        if (!auth || !auth.uid || !auth.role) return;

        const fetchData = async () => {
            console.log("Autenticado como:", auth.role);
            await fetchReservation(auth.uid);
        };

        fetchData();
    }, [auth.uid, auth.role]);


    const handleCancel = async (id) => {
         const result = await cancelReservation(id);
        if (result.success) {
        console.log("Reserva cancelada correctamente");
        await fetchReservation(auth.uid);
        } else {
            console.error("Error al cancelar reserva", result);
             // Aquí podrías mostrar un mensaje al usuario
        }
    };

    return (
        <Box>
            <SimpleGrid>
                {reservations.map((reservation) => (
                    <ReservationCard
                        key={reservation._id}
                        reservation={reservation}
                        onDelete={() => handleCancel(reservation._id)}
                    />
                ))}
            </SimpleGrid>
        </Box>
    );
};
