import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  Avatar,
  AvatarBadge,
  Text,
  VStack,
  Spinner,
  useColorModeValue,
  Box,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { fetchCurrentUser } from "../../services/userService.js";
import { useNavigate } from "react-router-dom";

export const DrawerButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const navigate = useNavigate();

  const bg = useColorModeValue("rgba(41, 87, 105, 0.82)", "rgba(34,42,41,0.95)");
  const color = useColorModeValue("#F9F7F2", "#7bc2c4");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // Estado para el modal de confirmación logout
  const {
    isOpen: isLogoutOpen,
    onOpen: onLogoutOpen,
    onClose: onLogoutClose,
  } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    if (isOpen && token) {
      setLoading(true);
      fetchCurrentUser(token)
        .then((data) => {
          setUser(data);
          setError(null);
        })
        .catch(() => {
          setError("No se pudo cargar la información del usuario.");
          setUser(null);
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, token]);

  const handleEditProfile = () => {
    onClose(); // Cierra el drawer antes de navegar
    navigate("/dashboard/edit-profile");
  };

  const handleLogout = () => {
    // Aquí haces logout real
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    onLogoutClose();
    onClose();
    navigate("/login");
  };

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        w="50px"
        h="50px"
        borderRadius="full"
        bg="transparent"
        _hover={{ bg: "rgba(0, 0, 0, 0.1)" }}
        p={0}
      >
        <Avatar
          w="52px"
          h="52px"
          name={user ? `${user.name} ${user.surname}` : ""}
          src=""
        >
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar>
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={bg} color={color}>
          <DrawerCloseButton />
          <DrawerHeader>Información del Usuario</DrawerHeader>

          <DrawerBody>
            {loading && <Spinner size="xl" />}
            {error && <Text color="red.400">{error}</Text>}
            {user && (
              <VStack spacing={4} align="start">
                <Text>
                  <strong>Nombre:</strong> {user.name} {user.surname}
                </Text>
                <Text>
                  <strong>Email:</strong> {user.email}
                </Text>

                {/* Botón para editar perfil */}
                <Box pt={4} w="100%">
                  <Button
                    colorScheme="teal"
                    w="100%"
                    onClick={handleEditProfile}
                    mb={4}
                  >
                    Editar Perfil
                  </Button>

                  {/* Botón para cerrar sesión */}
                  <Button colorScheme="red" w="100%" onClick={onLogoutOpen}>
                    Cerrar Sesión
                  </Button>
                </Box>
              </VStack>
            )}
            {!loading && !user && !error && (
              <Text>No hay usuario autenticado.</Text>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Modal confirmación logout */}
      <AlertDialog
        isOpen={isLogoutOpen}
        leastDestructiveRef={cancelRef}
        onClose={onLogoutClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmar cierre de sesión
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro que quieres cerrar sesión?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onLogoutClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleLogout} ml={3}>
                Cerrar Sesión
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
