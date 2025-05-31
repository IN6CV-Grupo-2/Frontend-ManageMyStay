// src/pages/EventFormUpdate.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Stack,
  Spinner,
  useToast,
  Select,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventByIdService, updateEventService } from '../../services/eventService';

const EventFormUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    finishDate: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getEventByIdService(id);
        const event = res.event;
        setFormData({
          name: event.name,
          description: event.description,
          startDate: event.startDate.slice(0, 16),
          finishDate: event.finishDate.slice(0, 16),
        });
      } catch (error) {
        toast({
          title: 'Error al cargar el evento',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEventService(id, formData);
      toast({
        title: 'Evento actualizado con éxito',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/events');
    } catch (error) {
      toast({
        title: 'Error al actualizar el evento',
        description: error.response?.data?.message || 'Error desconocido',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box maxW="600px" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Nombre del Evento</FormLabel>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Descripción</FormLabel>
            <Textarea name="description" value={formData.description} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Fecha de Inicio</FormLabel>
            <Input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Fecha de Finalización</FormLabel>
            <Input type="datetime-local" name="finishDate" value={formData.finishDate} onChange={handleChange} />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Actualizar Evento
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default EventFormUpdate;
