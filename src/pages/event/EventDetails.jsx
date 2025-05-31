import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Image,
  Heading,
  Text,
  Stack,
  Badge,
  Button,
  Spinner,
  Center,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast
} from '@chakra-ui/react';
import { getEventByIdService as getEventById } from '../../services/eventService';
import { cancelEventService } from '../../services/eventService';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getEventById(id);
        setEvent(res.event);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await cancelEventService(id);
      toast({
        title: "Evento eliminado.",
        description: "El evento ha sido eliminado correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate('/events');
    } catch (error) {
      toast({
        title: "Error al eliminar.",
        description: error.message || "No se pudo eliminar el evento.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setDeleting(false);
      onClose();
    }
  };

  if (loading) {
    return (
      <Center h="60vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!event) {
    return <Text>No se encontró el evento.</Text>;
  }

  return (
    <>
      <Box maxW="600px" mx="auto" p={6} mt={10} borderWidth="1px" borderRadius="lg" boxShadow="lg">
        <Image
          src={event.hotel?.image || "https://placehold.co/600x300"}
          alt="Imagen del hotel"
          mb={4}
          borderRadius="md"
          objectFit="cover"
        />
        <Stack spacing={4}>
          <Heading size="lg">{event.name}</Heading>
          <Text>{event.description}</Text>

          <Badge colorScheme="blue">{event.hotel?.name}</Badge>
          <Text>Dirección: {event.hotel?.address}</Text>

          <Text>
            Inicio: {event.startDate && new Date(event.startDate).toLocaleString()}
          </Text>
          <Text>
            Finalización: {event.finishDate && new Date(event.finishDate).toLocaleString()}
          </Text>

          <Text>Manager: {event.manager?.name}</Text>

          <Text>Servicios adicionales:</Text>
          {event.additionalServices && event.additionalServices.length > 0 ? (
            <ul>
              {event.additionalServices.map((srv) => (
                <li key={srv._id}>{srv.name}</li>
              ))}
            </ul>
          ) : (
            <Text>No hay servicios adicionales.</Text>
          )}

          <Stack direction="row" spacing={4}>
            <Button colorScheme="blue" onClick={() => navigate(`/events/update/${id}`)}>
              Actualizar
            </Button>
            <Button colorScheme="red" onClick={onOpen}>
              Eliminar
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Confirmación de eliminación */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmar eliminación
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro de que deseas eliminar este evento? Esta acción no se puede deshacer.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleDelete} isLoading={deleting} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default EventDetails;
