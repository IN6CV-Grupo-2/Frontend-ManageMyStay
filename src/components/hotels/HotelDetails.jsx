import React from 'react';
import { Box, Image, Text, Badge, Flex, Button, Stack } from '@chakra-ui/react';

const HotelDetails = ({ hotel, onBack }) => {
  if (!hotel) return null;
  return (
    <Box maxW="3xl" mx="auto" mt={8} p={6} bg="white" borderRadius="lg" boxShadow="lg">
      <Image src={hotel.image} alt={hotel.name} borderRadius="lg" w="100%" h="320px" objectFit="cover" mb={4} />
      <Stack spacing={3}>
        <Flex align="center" justify="space-between">
          <Text fontSize="2xl" fontWeight="bold">{hotel.name}</Text>
          <Badge colorScheme="teal" fontSize="1em">{hotel.location}</Badge>
        </Flex>
        <Text color="gray.600" fontSize="md">
          {hotel.rating} ★ ({hotel.reviews} reseñas)
        </Text>
        <Text color="blue.600" fontWeight="bold" fontSize="xl">
          ${hotel.price} <span style={{ fontWeight: 400, fontSize: '1rem' }}>/noche</span>
        </Text>
        <Text color="gray.700">
          Disfruta de una experiencia única en {hotel.name}, ubicado en {hotel.location}. Reserva ahora y vive una estadía inolvidable.
        </Text>
        <Flex gap={4} mt={4}>
          <Button colorScheme="teal" onClick={onBack}>Volver</Button>
          <Button colorScheme="blue">Reservar ahora</Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default HotelDetails;
