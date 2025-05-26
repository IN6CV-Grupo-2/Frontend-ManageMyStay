import { useEffect, useState } from "react";
import { Box, Button, SimpleGrid, Heading, useDisclosure } from "@chakra-ui/react";
import { getRooms, addRoom, updateRoom, deleteRoom } from "../../services/roomService.jsx";
import RoomCard from "../../components/room/RoomCard.jsx";
import RoomForm from "../../components/room/RoomForm.jsx";

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const hotelId = "6832b42fe24597617a9c4fd8"; // id del hotel por defecto

  const fetchRooms = async () => {
    const res = await getRooms(hotelId);
    console.log("Rooms fetched (full array):", res.data.rooms);
    console.log("First room fetched:", res.data.rooms[0]);
    setRooms(res.data.rooms);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    console.log("Rooms state updated, length:", rooms.length);
    console.log("Rooms sample (first 3):", rooms.slice(0, 3));
    if (rooms.length > 0) {
      console.log("First room _id:", rooms[0]._id);
    }
    const ids = rooms.map(r => r._id);
    console.log("Room IDs:", ids);
  }, [rooms]);

  const handleSave = async (roomData, roomId) => {
    console.log("handleSave called with id:", roomId, "data:", roomData);
    if (roomId) {
      await updateRoom(roomId, roomData); //Agregar token
    } else {
      await addRoom(roomData); //Agregar token
    }
    fetchRooms();
  };

  const handleDelete = async (id) => {
    console.log("Eliminando room con id:", id);
    await deleteRoom(id); //Agregar token
    fetchRooms();
  };

  const handleEdit = (room) => {
    setSelectedRoom(room);
    setTimeout(() => {
      onOpen();
    }, 0);
  };

  const handleAdd = () => {
    setSelectedRoom(null);
    setTimeout(() => {
      onOpen();
    }, 0);
  };

  return (
    <Box p={6}>
      <Button colorScheme="teal" mb={4} onClick={handleAdd}>
        Add Room
      </Button>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {rooms.map((room) => (
          <RoomCard
            key={room._id}
            room={room}
            onEdit={() => handleEdit(room)}
            onDelete={() => handleDelete(room._id)}
            onReserve={() => alert(`Reserved Room #${room.number}`)}
          />
        ))}
      </SimpleGrid>

      <RoomForm
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleSave}
        initialData={selectedRoom}
        hotelId={hotelId}
      />
    </Box>
  );
};

export default RoomsPage;