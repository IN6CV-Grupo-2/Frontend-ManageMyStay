import React, { useState } from 'react';
import { Box, Input, Button, Stack } from '@chakra-ui/react';
import { addHotel, updateHotel } from '../../services/hotelService';

const HotelForm = ({ hotel, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    hotel || { name: '', address: '', price: '', image: '', rating: 0, reviews: 0, starts: 1, amenities: '' }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        adminUser: "64b7f8c2e4b0f5a1d2c3e4f5" // Reemplaza con un ID válido de usuario administrador
      };

      if (hotel) {
        await updateHotel(hotel.uid, payload);
      } else {
        await addHotel(payload);
      }
      onSave();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box p={6} bg="white" borderRadius="lg" boxShadow="lg" w="100%" maxW="600px">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Input name="name" placeholder="Nombre del hotel" value={formData.name} onChange={handleChange} />
          <Input name="address" placeholder="Dirección" value={formData.address} onChange={handleChange} />
          <Input name="price" placeholder="Precio por noche" type="number" value={formData.price} onChange={handleChange} />
          <Input name="image" placeholder="URL de la imagen" value={formData.image} onChange={handleChange} />
          <Input name="rating" placeholder="Calificación (0-5)" type="number" value={formData.rating} onChange={handleChange} />
          <Input name="reviews" placeholder="Número de reseñas" type="number" value={formData.reviews} onChange={handleChange} />
          <Input name="starts" placeholder="Estrellas (1-5)" type="number" value={formData.starts} onChange={handleChange} />
          <Input name="amenities" placeholder="Comodidades" value={formData.amenities} onChange={handleChange} />
          <Stack direction="row" spacing={4}>
            <Button type="submit" colorScheme="teal">Guardar</Button>
            <Button onClick={onCancel} colorScheme="gray">Cancelar</Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default HotelForm;