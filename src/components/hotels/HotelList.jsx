import React, { useEffect, useState } from 'react';
import { Box, Image, Text, Badge, Flex, Button, Spinner } from '@chakra-ui/react';
import { fetchHotels, deleteHotel } from '../../services/hotelService';

const HotelList = ({ onSelectHotel, onEditHotel }) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHotels = async () => {
    try {
      setLoading(true);
      const data = await fetchHotels();
      setHotels(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHotel(id);
      setHotels(hotels.filter((hotel) => hotel.uid !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadHotels();
  }, []);

  if (loading) return <Spinner size="xl" />;

  return (
    <Flex wrap="wrap" gap={8} justify="center" py={8} w="100%">
      {hotels.map((hotel) => (
        <Box
          key={hotel.uid}
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          bg="white"
          _hover={{ boxShadow: 'xl', transform: 'scale(1.03)' }}
          transition="all 0.2s"
          cursor="pointer"
        >
          <Image src={hotel.image} alt={hotel.name} h="220px" w="100%" objectFit="cover" />
          <Box p="6">
            <Flex align="baseline">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                {hotel.starts} ★
              </Badge>
              <Text
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                ml={2}
                textTransform="uppercase"
              >
                {hotel.address}
              </Text>
            </Flex>
            <Text mt="1" fontWeight="bold" as="h4" fontSize="lg" lineHeight="tight">
              {hotel.name}
            </Text>
            <Flex mt={2} align="center">
              <Text color="gray.600" fontSize="sm">
                {hotel.rating} ★ ({hotel.reviews} reseñas)
              </Text>
            </Flex>
            <Flex mt={2} align="center" justify="space-between">
              <Text color="blue.600" fontWeight="bold" fontSize="xl">
                ${hotel.price} <span style={{ fontWeight: 400, fontSize: '0.9rem' }}>/noche</span>
              </Text>
              <Button colorScheme="teal" size="sm" onClick={() => onSelectHotel(hotel)}>
                Ver detalles
              </Button>
              <Button colorScheme="blue" size="sm" onClick={() => onEditHotel(hotel)}>
                Editar
              </Button>
              <Button colorScheme="red" size="sm" onClick={() => handleDelete(hotel.uid)}>
                Eliminar
              </Button>
            </Flex>
          </Box>
        </Box>
      ))}
    </Flex>
  );
};

export default HotelList;
