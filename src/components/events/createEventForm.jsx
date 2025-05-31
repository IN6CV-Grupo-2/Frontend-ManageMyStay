import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Heading,
  useToast,
  Spinner,
  Checkbox,
  CheckboxGroup,
  Stack,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  createEvent,
  getServices,
  getHotelsService,
} from "../../services/eventService.js";

export const CreateEventForm = ({ setView }) => {
  const toast = useToast();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(new Date());
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await getHotelsService();
        setHotels(data); 
      } catch (error) {
        console.error("Error loading hotels:", error);
      }
    };
    fetchHotels();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await getServices();
        setServices(res);
      } catch (error) {
        toast({
          title: "Error al obtener servicios",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchServices();
  }, []);

  const handleCreate = async () => {
    if (!name || !description || !startDate || !finishDate || !selectedHotel) {
      toast({
        title: "Campos obligatorios faltantes",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const eventData = {
        name,
        description,
        startDate: new Date(startDate).toISOString(),
        finishDate: new Date(finishDate).toISOString(),
        hotel: selectedHotel,
        services: selectedServices,
      };

      await createEvent(eventData);

      toast({
        title: "Evento creado exitosamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setView("general");
    } catch (error) {
      toast({
        title: "Error al crear evento",
        description: error.message || "Algo salió mal",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    setIsLoading(false);
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt={10}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading size="md" mb={6}>
        Agendar Nuevo Evento
      </Heading>

      <FormControl mb={4}>
        <FormLabel>Nombre del Evento</FormLabel>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej. Conferencia de Negocios"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Descripción</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Fecha de Inicio</FormLabel>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="chakra-input css-1c6p7n2"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Fecha de Finalización</FormLabel>
        <DatePicker
          selected={finishDate}
          onChange={(date) => setFinishDate(date)}
          className="chakra-input css-1c6p7n2"
        />
      </FormControl>

      <FormControl id="hotel" isRequired mb={4}>
        <FormLabel>Hotel</FormLabel>
        <Select
          placeholder="Seleccione un hotel"
          value={selectedHotel}
          onChange={(e) => setSelectedHotel(e.target.value)}
        >
          {hotels.map((hotel) => (
            <option key={hotel.uid} value={hotel.uid}>
              {hotel.name} - {hotel.address}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl id="services" mb={4}>
        <FormLabel>Servicios adicionales</FormLabel>
        <Stack spacing={2}>
          {services.map((srv) => {
            const isChecked = selectedServices.includes(srv.uid);
            return (
              <Checkbox
                key={srv.uid}
                isChecked={isChecked}
                onChange={() => {
                  setSelectedServices((prev) =>
                    isChecked
                      ? prev.filter((id) => id !== srv.uid)
                      : [...prev, srv.uid]
                  );
                }}
              >
                {srv.name}
              </Checkbox>
            );
          })}
        </Stack>
      </FormControl>

      <Stack direction="row" spacing={4} justify="flex-end">
        <Button onClick={() => setView("general")} colorScheme="gray">
          Cancelar
        </Button>
        <Button colorScheme="teal" onClick={handleCreate} isLoading={isLoading}>
          Crear Evento
        </Button>
      </Stack>
    </Box>
  );
};
