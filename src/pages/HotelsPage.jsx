import React, { useState } from 'react';
import { Box, Heading, Button, Flex } from '@chakra-ui/react';
import HotelList from '../components/hotels/HotelList';
import HotelDetails from '../components/hotels/HotelDetails';
import HotelForm from '../components/hotels/HotelForm';

const HotelsPage = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [editingHotel, setEditingHotel] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddHotel = () => {
    setEditingHotel(null);
    setShowForm(true);
  };

  const handleEditHotel = (hotel) => {
    setEditingHotel(hotel);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingHotel(null);
  };

  return (
    <Flex
      direction="column"
      minH="100vh"
      bg="gray.50"
      px={{ base: 4, md: 8 }}
      py={8}
      align="center"
    >
      <Heading as="h2" size="xl" mb={6} textAlign="center" color="teal.700">
        Explora hoteles destacados
      </Heading>
      {showForm ? (
        <HotelForm hotel={editingHotel} onSave={handleSave} onCancel={() => setShowForm(false)} />
      ) : selectedHotel ? (
        <HotelDetails hotel={selectedHotel} onBack={() => setSelectedHotel(null)} />
      ) : (
        <>
          <Button colorScheme="teal" mb={4} onClick={handleAddHotel}>
            Añadir Hotel
          </Button>
          <HotelList onSelectHotel={setSelectedHotel} onEditHotel={handleEditHotel} />
        </>
      )}
    </Flex>
  );
};

export default HotelsPage;
