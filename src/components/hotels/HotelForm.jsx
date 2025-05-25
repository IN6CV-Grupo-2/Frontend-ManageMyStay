import React, { useState, useEffect } from 'react';
import {
  Box,
  Input,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Flex,
  Icon,
  useColorModeValue,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react';
import {
  FaHotel,
  FaDollarSign,
  FaMapMarkerAlt,
  FaStar,
  FaRegImage,
  FaStarHalfAlt,
  FaRegListAlt
} from 'react-icons/fa';
import { addHotel, updateHotel } from '../../services/hotelService.js';

const HotelForm = ({ hotel, onSave, onCancel }) => {
  const defaultHotel = {
    name: '',
    address: '',
    price: '',
    image: '',
    rating: 0,
    reviews: 0,
    starts: 1,
    amenities: ''
  };

  const [formData, setFormData] = useState(hotel || defaultHotel);

  // ✅ ACTUALIZAMOS formData si cambia la prop hotel
  useEffect(() => {
    setFormData(hotel || defaultHotel);
  }, [hotel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStarsChange = (value) => {
    setFormData({ ...formData, starts: Number(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        rating: Number(formData.rating),
        reviews: Number(formData.reviews),
        starts: Number(formData.starts),
        adminUser: "64b7f8c2e4b0f5a1d2c3e4f5"
      };

      if (hotel) {
        await updateHotel(hotel.uid, payload);
      } else {
        await addHotel(payload);
      }

      onSave();
    } catch (error) {
      console.error("Error en la creación del hotel:", error);
      alert(`Error al añadir el hotel: ${error.message}`);
    }
  };

  const cardBg = useColorModeValue("#F9F7F2", "#2E2A29");
  const inputBorder = "#7bc2c4";

  return (
    <Flex align="center" justify="center" minH="100vh" w="100vw" py={8}>
      <Box
        bg={cardBg}
        boxShadow="0 6px 32px 0 rgba(44,98,117,0.18)"
        borderRadius="2xl"
        p={10}
        maxW="540px"
        w="100%"
        border="2px solid"
        borderColor="rgba(123,194,196,0.20)"
      >
        <Stack align="center" mb={6}>
          <Icon as={FaHotel} boxSize={10} color="#b8807c" />
          <FormLabel fontSize="2xl" fontWeight="extrabold" color="#2e576a">Hotel</FormLabel>
        </Stack>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4} isRequired>
            <FormLabel color="#b8807c"><Icon as={FaHotel} mr={2}/>Nombre del hotel</FormLabel>
            <Input
              name="name"
              placeholder="Nombre del hotel"
              value={formData.name}
              borderColor={inputBorder}
              focusBorderColor="#2e576a"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel color="#b8807c"><Icon as={FaMapMarkerAlt} mr={2}/>Dirección</FormLabel>
            <Input
              name="address"
              placeholder="Dirección"
              value={formData.address}
              borderColor={inputBorder}
              focusBorderColor="#2e576a"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel color="#b8807c"><Icon as={FaDollarSign} mr={2}/>Precio por noche</FormLabel>
            <Input
              name="price"
              placeholder="Precio por noche"
              type="number"
              value={formData.price}
              borderColor={inputBorder}
              focusBorderColor="#2e576a"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel color="#b8807c"><Icon as={FaRegImage} mr={2}/>URL de la imagen</FormLabel>
            <Input
              name="image"
              placeholder="URL de la imagen"
              value={formData.image}
              borderColor={inputBorder}
              focusBorderColor="#2e576a"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel color="#b8807c"><Icon as={FaStarHalfAlt} mr={2}/>Calificación (0-5)</FormLabel>
            <Input
              name="rating"
              placeholder="Calificación (0-5)"
              type="number"
              value={formData.rating}
              borderColor={inputBorder}
              focusBorderColor="#2e576a"
              onChange={handleChange}
              min={0} max={5} step={0.1}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel color="#b8807c"><Icon as={FaRegListAlt} mr={2}/>Número de reseñas</FormLabel>
            <Input
              name="reviews"
              placeholder="Número de reseñas"
              type="number"
              value={formData.reviews}
              borderColor={inputBorder}
              focusBorderColor="#2e576a"
              onChange={handleChange}
              min={0}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel color="#b8807c"><Icon as={FaStar} mr={2}/>Estrellas (1-5)</FormLabel>
            <NumberInput min={1} max={5} value={formData.starts} onChange={handleStarsChange}>
              <NumberInputField name="starts" borderColor={inputBorder} focusBorderColor="#2e576a" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl mb={6}>
            <FormLabel color="#b8807c"><Icon as={FaRegListAlt} mr={2}/>Comodidades</FormLabel>
            <Input
              name="amenities"
              placeholder="Comodidades (separadas por coma)"
              value={formData.amenities}
              borderColor={inputBorder}
              focusBorderColor="#2e576a"
              onChange={handleChange}
            />
          </FormControl>
          <Stack direction="row" spacing={4} justify="center">
            <Button type="submit" colorScheme="teal">Guardar</Button>
            <Button onClick={onCancel} colorScheme="pink" variant="outline" borderColor="#b8807c">Cancelar</Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default HotelForm;
