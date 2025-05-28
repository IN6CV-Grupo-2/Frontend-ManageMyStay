import React from 'react';
import {
  Box,
  Image,
  Text,
  Badge,
  Flex,
  Button,
  Stack,
  Icon,
  useColorModeValue
} from '@chakra-ui/react';
import { FaHotel, FaStar, FaMapMarkerAlt, FaDollarSign, FaArrowLeft, FaRegListAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const meddleBg = "linear-gradient(135deg, #2E576A 0%, #B8807C 60%, #7BC2C4 100%)";


const HotelDetails = ({ hotel, onBack }) => {
  if (!hotel) return null;
  const navigate = useNavigate();
  const cardBg = useColorModeValue("#F9F7F2", "#2E2A29");

  const handleNavigateRooms = () => {
    navigate(`/rooms/${hotel.uid}`)
  }
  return (
    <Flex minH="100vh" w="100vw" justify="center" align="center" py={12} bg={meddleBg}>
      <Box maxW="3xl" w="100%" mx="auto" p={8} bg={cardBg} borderRadius="2xl" boxShadow="2xl" border="2px solid" borderColor="#7bc2c4">
        <Image src={hotel.image} alt={hotel.name} borderRadius="2xl" w="100%" h="320px" objectFit="cover" mb={6} />
        <Stack spacing={3}>
          <Flex align="center" justify="space-between">
            <Text fontSize="2xl" fontWeight="bold" color="#2e576a" display="flex" alignItems="center">
              <Icon as={FaHotel} color="#b8807c" mr={2}/>{hotel.name}
            </Text>
            <Badge colorScheme="teal" fontSize="1em" p={2} borderRadius="md">
              <Icon as={FaMapMarkerAlt} mr={1}/>{hotel.address}
            </Badge>
          </Flex>
          <Text color="#b8807c" fontSize="md" display="flex" alignItems="center">
            <Icon as={FaStar} color="teal.400" mr={2}/>{hotel.rating} ★ ({hotel.reviews} reseñas)
          </Text>
          <Text color="#213547" fontWeight="bold" fontSize="xl" display="flex" alignItems="center">
            <Icon as={FaDollarSign} color="#7bc2c4" mr={2}/> ${hotel.price} <span style={{ fontWeight: 400, fontSize: '1rem' }}>/noche</span>
          </Text>
          <Text color="#2e576a" display="flex" alignItems="center">
            <Icon as={FaRegListAlt} mr={2}/> {hotel.amenities}
          </Text>
          <Text color="gray.700">
            Disfruta de una experiencia única en {hotel.name}. Reserva ahora y vive una estadía inolvidable.
          </Text>
          <Flex gap={4} mt={6}>
            <Button leftIcon={<FaArrowLeft />} colorScheme="teal" onClick={onBack}>Volver</Button>
            <Button colorScheme="blue" variant="solid" onClick={handleNavigateRooms}>Reservar ahora</Button>
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
};

export default HotelDetails;