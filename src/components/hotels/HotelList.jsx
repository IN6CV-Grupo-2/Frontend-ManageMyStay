import React, { useEffect, useState } from 'react';
import {
  Box,
  Image,
  Text,
  Flex,
  Button,
  Spinner,
  Icon,
  VStack,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react';
import {
  FaHotel,
  FaStar,
  FaMapMarkerAlt,
  FaDollarSign,
  FaRegListAlt,
  FaEdit,
  FaEye,
  FaTrash
} from 'react-icons/fa';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { fetchHotels, deleteHotel } from '../../services/hotelService.js';

const HotelList = ({ onSelectHotel, onEditHotel }) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStars, setFilterStars] = useState(0);

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

  const cardBg = useColorModeValue("#F9F7F2", "#2E2A29");
  const starColor = "#b8807c";

  const filteredHotels = filterStars > 0
    ? hotels.filter(hotel => hotel.starts === filterStars)
    : hotels;

  const renderStars = (count) => {
    return Array.from({ length: count }, (_, i) => (
      <Icon as={FaStar} key={i} color={starColor} boxSize={4} mr={0.5} />
    ));
  };

  if (loading) return <Spinner size="xl" />;

  return (
    <Box minH="100vh" w="100vw" py={8}>
      <VStack spacing={4} align="stretch" maxW="1200px" mx="auto" w="100%">
        {/* Título */}
        <Flex justify="center" align="center" px={4}>
          <Icon as={FaHotel} boxSize={10} color={starColor} mr={2} />
          <Text fontSize="3xl" fontWeight="black" color="#2e576a" letterSpacing="wide" textAlign="center">
            Listado de Hoteles
          </Text>
        </Flex>

        {/* Contenedor estrella decorativa a la izquierda y filtro */}
        <Flex px={4} mb={6} maxW="280px" align="center" gap={3}>
          {/* Estrella decorativa afuera del filtro a la izquierda */}
          <Icon as={FaStar} color={starColor} boxSize={6} />

          {/* Menú filtro */}
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              borderColor="#7bc2c4"
              variant="outline"
              colorScheme="teal"
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
            >
              <Flex align="center" gap={1}>
                {filterStars > 0 ? renderStars(filterStars) : 'Todas las estrellas'}
              </Flex>

              {/* Mostrar la estrella extra SOLO cuando se seleccione "Todas las estrellas" */}
              {filterStars === 0 && (
                <Icon as={FaStar} color="teal.400" boxSize={5} />
              )}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setFilterStars(0)}>Todas las estrellas</MenuItem>
              {[1, 2, 3, 4, 5].map((star) => (
                <MenuItem key={star} onClick={() => setFilterStars(star)}>
                  {renderStars(star)}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>

        <Flex wrap="wrap" gap={8} justify="center" w="100%">
          {filteredHotels.map((hotel) => (
            <Box
              key={hotel.uid}
              maxW="xs"
              minW="270px"
              borderWidth="2px"
              borderRadius="2xl"
              overflow="hidden"
              boxShadow="xl"
              bg={cardBg}
              _hover={{ boxShadow: '2xl', transform: 'scale(1.04)' }}
              transition="all 0.2s"
              cursor="pointer"
              borderColor="#7bc2c4"
            >
              <Image src={hotel.image} alt={hotel.name} h="200px" w="100%" objectFit="cover" />
              <Box p="5">
                <Flex align="center" mb={2}>
                  <Flex mr={2}>{renderStars(hotel.starts)}</Flex>
                  <Text color={starColor} fontWeight="semibold" fontSize="sm" ml={2}>
                    <Icon as={FaMapMarkerAlt} mr={1} /> {hotel.address}
                  </Text>
                </Flex>
                <Text mt="1" fontWeight="bold" as="h4" fontSize="lg" color="#2e576a">
                  {hotel.name}
                </Text>
                <Text color="gray.600" fontSize="sm" mt={1}>
                  <Icon as={FaStar} color="teal.400" mr={1} /> {hotel.rating} ({hotel.reviews} reseñas)
                </Text>
                <Text color="#213547" fontWeight="bold" fontSize="xl" mt={2}>
                  <Icon as={FaDollarSign} color="#7bc2c4" mr={1} /> ${hotel.price}
                  <span style={{ fontWeight: 400, fontSize: '0.9rem' }}>/noche</span>
                </Text>
                <Text color="#2e576a" fontSize="sm" mt={2}>
                  <Icon as={FaRegListAlt} mr={1} /> {hotel.amenities}
                </Text>
                <Flex mt={4} justify="space-between" align="center" gap={2}>
                  <Button leftIcon={<FaEye />} colorScheme="teal" size="sm" variant="solid" onClick={() => onSelectHotel(hotel)}>
                    Ver detalles
                  </Button>
                  <Button leftIcon={<FaEdit />} colorScheme="blue" size="sm" variant="outline" borderColor={starColor} onClick={() => onEditHotel(hotel)}>
                    Editar
                  </Button>
                  <Button leftIcon={<FaTrash />} colorScheme="pink" size="sm" variant="ghost" onClick={() => handleDelete(hotel.uid)}>
                    Eliminar
                  </Button>
                </Flex>
              </Box>
            </Box>
          ))}
        </Flex>
      </VStack>
    </Box>
  );
};

export default HotelList;
