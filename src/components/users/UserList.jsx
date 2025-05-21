import { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../../services/userService";
import {
  Spinner,
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Avatar,
  Flex,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError("Error al cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDeactivate = async (id) => {
    try {
      await deleteUser(id);
      toast({
        title: "Usuario desactivado.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      await loadUsers();
    } catch (err) {
      setError("Error al desactivar el usuario.");
    }
  };

  const cardBg = useColorModeValue("white", "gray.800");

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box maxW="900px" mx="auto" p={5}>
      <Text fontSize="3xl" fontWeight="bold" mb={10} textAlign="center">
        Usuarios
      </Text>
      <Stack spacing={5}>
        {users.map((user) => (
          <Flex
            key={user._id}
            boxShadow="2xl"
            borderRadius="2xl"
            p={5}
            align="center"
            justify="space-between"
            bg={cardBg}
            direction={{ base: "column", md: "row" }}
          >
            <Flex align="center" gap={5}>
              <Avatar
                size="lg"
                name={`${user.name} ${user.surname}`}
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}${user.surname}`}
              />
              <Box>
                <Text fontWeight="bold" fontSize="lg">
                  {user.name} {user.surname}
                </Text>
                <Text color="gray.500">{user.email}</Text>
              </Box>
            </Flex>
            <Flex gap={2} mt={{ base: 3, md: 0 }}>
              <Button colorScheme="blue" onClick={() => navigate(`/users/${user._id}`)}>
                Detalles
              </Button>
              <Button colorScheme="yellow" onClick={() => navigate(`/users/edit/${user._id}`)}>
                Editar
              </Button>
              <Button colorScheme="red" onClick={() => handleDeactivate(user._id)}>
                Desactivar
              </Button>
            </Flex>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};