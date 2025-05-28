import { Box, Text, Button, VStack, HStack } from "@chakra-ui/react";

const RoomCard = ({ room, onEdit, onDelete, onReserve }) => {
  return (
    <Box p={4} shadow="md" borderWidth="1px" borderRadius="lg">
      <VStack align="start">
        <Text fontWeight="bold">Room #{room.number}</Text>
        <Text>Type: {room.type}</Text>
        <Text>Capacity: {room.ability}</Text>
        <Text>Price: ${room.priceNight} /night</Text>
        <HStack spacing={2} pt={2}>
          <Button onClick={onEdit}>
            Edit
          </Button>

          <Button colorScheme="red" size="sm" onClick={onDelete}>
            Delete
          </Button>

          <Button colorScheme="green" size="sm" onClick={onReserve}>
            Reserve
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default RoomCard;