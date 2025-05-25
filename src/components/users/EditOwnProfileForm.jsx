

import React, { useEffect, useState } from 'react';
import {
  Box,
  Input,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Flex,
  Icon,
  useColorModeValue,
  Heading,
  useToast,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/react';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEdit } from 'react-icons/fa';
import { fetchCurrentUser, updateUser, updatedPassword } from '../../services/userService';

const meddleBg = "linear-gradient(135deg, #2E576A 0%, #B8807C 60%, #7BC2C4 100%)";

const EditOwnProfileForm = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: '',
    surname: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const cancelRef = React.useRef();
  const toast = useToast();

  const cardBg = useColorModeValue("#F9F7F2", "#2E2A29");
  const inputBorder = "#7bc2c4";

  useEffect(() => {
    fetchCurrentUser()
      .then(user => {
        setUser(user);
        setForm({ ...form, name: user.name, surname: user.surname });
      })
      .catch(err => {
        toast({
          title: "Error al obtener usuario",
          description: err.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
  }, []);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await updateUser(user.id, {
        name: form.name,
        surname: form.surname,
      });

      if (form.password && form.password === form.confirmPassword) {
        await updatedPassword(user.id, { password: form.password });
      }

      toast({
        title: "Perfil actualizado correctamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error al actualizar",
        description: err.message || 'Hubo un problema',
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    setDialogOpen(false);
  };

  return (
    <Flex align="center" justify="center" minH="100vh" w="100vw" py={8} bg={meddleBg}>
      <Box
        bg={cardBg}
        boxShadow="0 6px 32px 0 rgba(44,98,117,0.18)"
        borderRadius="2xl"
        p={10}
        maxW="540px"
        w="100%"
        border="2px solid"
        borderColor="rgba(123,194,196,0.20)"
      >
        <Stack align="center" mb={6}>
          <Icon as={FaEdit} boxSize={10} color="#b8807c" />
          <Heading fontSize="2xl" fontWeight="extrabold" color="#2e576a">
            Editar Mi Perfil
          </Heading>
        </Stack>

        {user && (
          <>
            <FormControl mb={4}>
              <FormLabel color="#b8807c">Nombre</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <FaUser color="gray" />
                </InputLeftElement>
                <Input
                  value={form.name}
                  onChange={handleChange("name")}
                  borderColor={inputBorder}
                  focusBorderColor="#2e576a"
                />
              </InputGroup>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel color="#b8807c">Apellido</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <FaUser color="gray" />
                </InputLeftElement>
                <Input
                  value={form.surname}
                  onChange={handleChange("surname")}
                  borderColor={inputBorder}
                  focusBorderColor="#2e576a"
                />
              </InputGroup>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel color="#b8807c">Nueva contraseña</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <FaLock color="gray" />
                </InputLeftElement>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange("password")}
                  borderColor={inputBorder}
                  focusBorderColor="#2e576a"
                />
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="toggle password"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl mb={6}>
              <FormLabel color="#b8807c">Confirmar contraseña</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <FaLock color="gray" />
                </InputLeftElement>
                <Input
                  type={showConfirm ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  borderColor={inputBorder}
                  focusBorderColor="#2e576a"
                />
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    icon={showConfirm ? <FaEyeSlash /> : <FaEye />}
                    onClick={() => setShowConfirm(!showConfirm)}
                    aria-label="toggle confirm password"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack spacing={4} direction="row" justify="center">
              <Button colorScheme="teal" onClick={() => setDialogOpen(true)}>
                Guardar cambios
              </Button>
            </Stack>

            <AlertDialog
              isOpen={isDialogOpen}
              leastDestructiveRef={cancelRef}
              onClose={() => setDialogOpen(false)}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Confirmar cambios
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    ¿Estás seguro de que deseas guardar los cambios en tu perfil?
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={() => setDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button colorScheme="teal" onClick={handleSubmit} ml={3}>
                      Confirmar
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default EditOwnProfileForm;
