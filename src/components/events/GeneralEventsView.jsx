import React, { useEffect, useState } from "react";
import { getAllEvents } from "../../services/eventService.js";
import {
  Box,
  Image,
  Text,
  Heading,
  SimpleGrid,
  Spinner,
  Center,
  Stack,
  Badge,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";





const GeneralEventsView = ({ setView }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { events } = await getAllEvents();
        setEvents(events);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <Center h="60vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box px={{ base: 4, md: 10 }} py={6}>
      <Heading size="lg" mb={6} textAlign="center">
        Eventos Realizados
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
        {events.map((event) => (
          <Box
            key={event._id}
            borderWidth="1px"
            borderRadius="2xl"
            overflow="hidden"
            bg={useColorModeValue("white", "gray.800")}
            shadow="md"
            _hover={{
              shadow: "xl",
              transform: "scale(1.02)",
              transition: "0.3s",
            }}
          >
            <Image
              src={event.hotel?.image || "https://placehold.co/300x200"}
              alt={event.hotel?.name || "Hotel"}
              objectFit="cover"
              w="100%"
              h="200px"
            />
            <Box p={4}>
              <Stack spacing={2}>
                <Heading size="md">{event.name}</Heading>
                <Text fontSize="sm" color="gray.600">
                  {event.description?.substring(0, 100)}...
                </Text>
                <Badge colorScheme="blue" w="fit-content">
                  {event.hotel?.name || "Hotel desconocido"}
                </Badge>
                <Text fontSize="sm" color="gray.500">
                  Manager: {event.manager?.name || "N/A"}
                </Text>
                <Button
                  size="sm"
                  colorScheme="teal"
                  mt={2}
                  onClick={() => navigate(`/events/${event.uid}`)}
                >
                  Detalles
                </Button>
              </Stack>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      <Box textAlign="left" mt={8}>
        <Button colorScheme="teal" onClick={() => setView("create")}>
          Agendar un evento
        </Button>
      </Box>
    </Box>
  );
};

export default GeneralEventsView;
