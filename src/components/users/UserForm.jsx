import { useEffect, useState } from "react";
import { updateUser } from "../../services/userService";
import {
  Box,
  Input,
  Button,
  Spinner,
  Text,
  FormControl,
  FormLabel,
  Select,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserEdit, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const meddleBg = "linear-gradient(135deg, #2E576A 0%, #B8807C 60%, #7BC2C4 100%)";

export const UserForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    role: "",
  });
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
        if (!response.ok) throw new Error("Error al cargar los datos del usuario.");
        const data = await response.json();
        const userData = data.user ? data.user : data;
        setFormData({
          name: userData.name || "",
          surname: userData.surname || "",
          email: userData.email || "",
          role: userData.role || "",
        });
      } catch (err) {
        setError("Error al cargar los datos del usuario.");
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, formData);
      navigate("/users");
    } catch (err) {
      setError("Error al actualizar el usuario.");
    }
  };

  const cardBg = "#F9F7F2";
  const inputBorder = "#7bc2c4";
  const cardShadow = "0 6px 32px 0 rgba(44,98,117,0.18)";

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.400">{error}</Text>;

  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      w="100vw"
      py={8}
      bg={meddleBg}
    >
      <Box
        bg={cardBg}
        boxShadow={cardShadow}
        borderRadius="2xl"
        p={10}
        maxW="540px"
        w="100%"
        border="2px solid"
        borderColor="rgba(123,194,196,0.20)"
      >
        <Text
          fontSize="2xl"
          fontWeight="black"
          mb={5}
          textAlign="center"
          color="#2e576a"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={FaUserEdit} color="#b8807c" boxSize={8} mr={3} />
          Editar Usuario
        </Text>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4} isRequired>
            <FormLabel color="#b8807c">Nombre</FormLabel>
            <Input
              name="name"
              placeholder="Nombre"
              value={formData.name}
              borderColor={inputBorder}
              focusBorderColor="#2e576a"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel color="#b8807c">Apellido</FormLabel>
            <Input
              name="surname"
              placeholder="Apellido"
              value={formData.surname}
              borderColor={inputBorder}
              focusBorderColor="#2e576a"
              onChange={(e) =>
                setFormData({ ...formData, surname: e.target.value })
              }
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel color="#b8807c">Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="Correo electrónico"
              value={formData.email}
              borderColor={inputBorder}
              focusBorderColor="#2e576a"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </FormControl>
          <FormControl mb={6} isRequired>
            <FormLabel color="#b8807c">Rol</FormLabel>
            <Select
              name="role"
              value={formData.role}
              borderColor={inputBorder}
              focusBorderColor="#2e576a"
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              placeholder="Selecciona un rol"
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
              <option value="manager">Manager</option>
            </Select>
          </FormControl>
          <Flex gap={3} justify="center">
            <Button
              leftIcon={<FaCheckCircle />}
              type="submit"
              colorScheme="teal"
            >
              Guardar
            </Button>
            <Button
              leftIcon={<FaTimesCircle />}
              colorScheme="pink"
              variant="outline"
              borderColor="#b8807c"
              onClick={() => navigate("/users")}
            >
              Cancelar
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};
