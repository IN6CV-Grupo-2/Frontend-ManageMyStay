import { Box, Text,Button, VStack, HStack,Badge, useColorModeValue } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export const ReservationCard = ({reservation, onDelete}) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/reservations/edit/${reservation._id}`);
    };
    const cardBg = useColorModeValue("white", "gray.700");
    const cardBorder = useColorModeValue("gray.200", "gray.600");
    return (
         <Box
      p={6}
      shadow="lg"
      borderWidth="1px"
      borderRadius="2xl"
      bg={cardBg}
      borderColor={cardBorder}
      transition="all 0.2s"
      _hover={{ shadow: "xl", transform: "translateY(-2px)" }}
    >
      <VStack align="start" spacing={3}>
        <HStack justifyContent="space-between" w="full">
          <Text fontSize="lg" fontWeight="bold" color="purple.600">
            Reserva #{reservation._id}
          </Text>
          <Badge colorScheme="green" variant="subtle">
            Activa
          </Badge>
        </HStack>

        <Text><strong>Check-In:</strong> {new Date(reservation.checkIn).toLocaleDateString()}</Text>
        <Text><strong>Check-Out:</strong> {new Date(reservation.checkOut).toLocaleDateString()}</Text>
        <Text><strong>Room:</strong> {reservation.rooms} #104</Text>
        <Text><strong>Hotel:</strong> {reservation.hotel.name}</Text>

        <HStack spacing={3} pt={3}>
          <Button
            leftIcon={<EditIcon />}
            colorScheme="blue"
            variant="solid"
            onClick={handleEdit}
          >
            Editar
          </Button>

          <Button
            leftIcon={<DeleteIcon />}
            colorScheme="red"
            variant="outline"
            size="sm"
            onClick={onDelete}
          >
            Cancelar
          </Button>
        </HStack>
      </VStack>
    </Box>
    )
}