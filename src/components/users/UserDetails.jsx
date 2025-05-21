import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Spinner,
  Button,
  Avatar,
  Flex,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";

export const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/manageMyStay/v1/user/${id}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        const data = await response.json();
        setUser(data.user ? data.user : data);
      } catch (err) {
        setError("Error al cargar los detalles del usuario.");
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [id]);

  const cardBg = useColorModeValue("white", "gray.800");

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">{error}</Text>;
  if (!user) return null;

  return (
    <Flex direction="column" align="center" mt={10}>
      <Box
        bgGradient="linear(to-r, blue.400, purple.400)"
        w="100%"
        h="180px"
        borderTopRadius="2xl"
        mb="-90px"
        position="relative"
      ></Box>
      <Box
        bg={cardBg}
        boxShadow="2xl"
        borderRadius="2xl"
        p={8}
        pt={24}
        textAlign="center"
        maxW="420px"
        w="100%"
        zIndex={2}
      >
        <Avatar
          size="2xl"
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}${user.surname}`}
          name={`${user.name} ${user.surname}`}
          mt={-20}
          mb={4}
        />
        <Text fontSize="2xl" fontWeight="bold">
          {user.name} {user.surname}
        </Text>
        <Text color="gray.500" mb={2}>
          {user.email}
        </Text>
        <Badge
          colorScheme={user.status ? "green" : "red"}
          fontSize="1em"
          mb={2}
        >
          {user.status ? "Activo" : "Inactivo"}
        </Badge>
        <Box mt={2}>
          <Text>
            <strong>Rol:</strong> {user.role}
          </Text>
        </Box>
        <Flex gap={4} mt={8} justify="center">
          <Button colorScheme="yellow" onClick={() => navigate(`/users/edit/${user._id}`)}>
            Editar
          </Button>
          <Button onClick={() => navigate("/users")}>Volver</Button>
        </Flex>
      </Box>
    </Flex>
  );
};