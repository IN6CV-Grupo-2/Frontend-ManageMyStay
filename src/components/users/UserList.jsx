import { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../../services/userService";
import {
  Spinner,
  Box,
  Text,
  Avatar,
  Flex,
  Button,
  useToast,
  VStack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaUsers, FaEdit, FaEye, FaUserSlash } from "react-icons/fa";

const meddleBg = "linear-gradient(135deg, #2E576A 0%, #B8807C 60%, #7BC2C4 100%)";

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

  const cardBg = "#F9F7F2";
  const cardShadow = "0 4px 32px 0 rgba(44,98,117,0.16)";

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.400">{error}</Text>;

  return (
    <Box
      minH="100vh"
      w="100vw"
      py={10}
      px={0}
      m={0}
      bg={meddleBg}
      bgImage="url('https://upload.wikimedia.org/wikipedia/en/6/67/Pink_Floyd_-_Meddle.jpg')"
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPosition="bottom right"
    >
      <Flex justify="center" align="center" mb={8}>
        <Icon as={FaUsers} boxSize={12} color="#7bc2c4" mr={4} />
        <Text
          fontSize="4xl"
          fontWeight="bold"
          color="whiteAlpha.900"
          letterSpacing="wide"
          textShadow="0 4px 40px #7bc2c4"
        >
          Usuarios
        </Text>
      </Flex>
      <VStack spacing={8} align="stretch" maxW="1100px" mx="auto" w="100%">
        {users.map((user) => (
          <Flex
            key={user._id}
            boxShadow={cardShadow}
            borderRadius="2xl"
            p={7}
            align="center"
            justify="space-between"
            bg={cardBg}
            border="2px solid"
            borderColor="rgba(123,194,196,0.28)"
            transition="transform 0.15s"
            _hover={{ transform: "scale(1.03)", boxShadow: "0 6px 32px 0 #7bc2c488" }}
            w="100%"
            direction={{ base: "column", md: "row" }}
          >
            <HStack spacing={6}>
              <Avatar
                size="xl"
                name={`${user.name} ${user.surname}`}
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}${user.surname}`}
                border="3px solid #7BC2C4"
                bg="teal.300"
              />
              <Box>
                <Text fontWeight="bold" fontSize="2xl" color="#2e576a" display="flex" alignItems="center">
                  <Icon as={FaUserCircle} color="#b8807c" mr={2} />{user.name} {user.surname}
                </Text>
                <Text color="#b8807c" fontWeight="semibold">{user.email}</Text>
              </Box>
            </HStack>
            <HStack mt={{ base: 3, md: 0 }}>
              <Button leftIcon={<FaEye />} colorScheme="teal" variant="solid" onClick={() => navigate(`/users/${user._id}`)}>
                Detalles
              </Button>
              <Button leftIcon={<FaEdit />} colorScheme="pink" variant="outline" borderColor="#b8807c" onClick={() => navigate(`/users/edit/${user._id}`)}>
                Editar
              </Button>
              <Button leftIcon={<FaUserSlash />} colorScheme="cyan" variant="ghost" color="#7bc2c4" _hover={{ bg: "#2e576a", color: "white" }} onClick={() => handleDeactivate(user._id)}>
                Desactivar
              </Button>
            </HStack>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};