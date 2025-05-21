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
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";

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
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
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

  const cardBg = useColorModeValue("white", "gray.800");

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Flex align="center" justify="center" minH="90vh" py={8}>
      <Box
        bg={cardBg}
        boxShadow="2xl"
        borderRadius="2xl"
        p={8}
        minW={{ base: "90vw", sm: "400px" }}
        maxW="480px"
      >
        <Text fontSize="2xl" fontWeight="bold" mb={5} textAlign="center">
          Editar Usuario
        </Text>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4} isRequired>
            <FormLabel>Nombre</FormLabel>
            <Input
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Apellido</FormLabel>
            <Input
              name="surname"
              placeholder="Apellido"
              value={formData.surname}
              onChange={(e) =>
                setFormData({ ...formData, surname: e.target.value })
              }
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </FormControl>
          <FormControl mb={6} isRequired>
            <FormLabel>Rol</FormLabel>
            <Select
              name="role"
              value={formData.role}
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
            <Button type="submit" colorScheme="blue">
              Guardar
            </Button>
            <Button onClick={() => navigate("/users")}>Cancelar</Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};