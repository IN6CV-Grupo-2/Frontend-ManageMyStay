import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Spinner,
  Button,
  Avatar,
  Flex,
  Badge,
  Icon,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserCircle, FaArrowLeft, FaEdit } from "react-icons/fa";

const meddleBg = "linear-gradient(135deg, #2E576A 0%, #B8807C 60%, #7BC2C4 100%)";

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
            headers: { 'x-token': localStorage.getItem("token") },
          }
        );
        if (!response.ok) throw new Error('Error al cargar los detalles del usuario.');
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

  const cardBg = "#F9F7F2";
  const cardShadow = "0 6px 32px 0 rgba(44,98,117,0.21)";

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.400">{error}</Text>;
  if (!user) return null;

  return (
    <Flex
      direction="column"
      align="center"
      minH="100vh"
      w="100vw"
      justify="center"
      bg={meddleBg}
      bgImage="url('https://upload.wikimedia.org/wikipedia/en/6/67/Pink_Floyd_-_Meddle.jpg')"
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPosition="bottom right"
      py={12}
    >
      <Box
        bg={cardBg}
        boxShadow={cardShadow}
        borderRadius="2xl"
        p={10}
        pt={24}
        textAlign="center"
        maxW="520px"
        w="100%"
        zIndex={2}
        border="2px solid"
        borderColor="rgba(123,194,196,0.16)"
        position="relative"
      >
        <Avatar
          size="2xl"
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}${user.surname}`}
          name={`${user.name} ${user.surname}`}
          position="absolute"
          top={-70}
          left="50%"
          transform="translateX(-50%)"
          border="5px solid #7bc2c4"
          bg="teal.300"
        />
        <Text
          fontSize="2xl"
          fontWeight="black"
          color="#2e576a"
          mt={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={FaUserCircle} color="#b8807c" mr={3} />
          {user.name} {user.surname}
        </Text>
        <Text color="#b8807c" mb={3} fontWeight="medium">
          {user.email}
        </Text>
        <Badge colorScheme={user.status ? "teal" : "red"} fontSize="1em" mb={2}>
          {user.status ? "Activo" : "Inactivo"}
        </Badge>
        <Box mt={2}>
          <Text>
            <strong>Rol:</strong>{" "}
            <span style={{ color: "#2e576a" }}>{user.role}</span>
          </Text>
        </Box>
        <Flex gap={4} mt={8} justify="center">
          <Button
            leftIcon={<FaEdit />}
            colorScheme="pink"
            variant="solid"
            onClick={() => navigate(`/users/edit/${user._id}`)}
          >
            Editar
          </Button>
          <Button
            leftIcon={<FaArrowLeft />}
            colorScheme="cyan"
            variant="outline"
            borderColor="#7bc2c4"
            onClick={() => navigate("/users")}
          >
            Volver
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};
