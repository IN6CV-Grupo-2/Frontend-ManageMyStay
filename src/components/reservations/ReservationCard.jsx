import { Box, Text,Button, VStack, HStack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";

export const ReservationCard = ({reservation, onDelete}) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/reservations/edit/${reservation._id}`);
    };
    return (
         <Box p={4} shadow="md" borderWidth="1px" borderRadius="lg">
      <VStack align="start">
        <Text fontWeight="bold">Reservation #{reservation._id}</Text>
        <Text>Check-In: {reservation.checkIn}</Text>
        <Text>Check-Out: {reservation.checkOut}</Text>
        <Text>Room: {reservation.rooms}</Text>
        <Text>Hotel: {reservation.hotel.name}</Text>
        <HStack spacing={2} pt={2}>
          <Button onClick={handleEdit}>
            Edit
          </Button>

          <Button colorScheme="red" size="sm" onClick={onDelete} >
            Cancel
          </Button>
        </HStack>
      </VStack>
    </Box>
    )
}