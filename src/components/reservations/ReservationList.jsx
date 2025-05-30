import { useState } from "react"
import { SimpleGrid } from "@chakra-ui/react"

export const Reservations = () => {

    const [reservations, setReservations] = useState([]);

    return (

        <SimpleGrid>
            {reservations.map((reservation) => (
                

            ))}
        </SimpleGrid>
    )
}