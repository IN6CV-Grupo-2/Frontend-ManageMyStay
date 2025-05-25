import {
  Flex,
  Box,
  IconButton,
  HStack,
  useColorModeValue,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Button,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHotel,
  FaUserFriends,
  FaHome,
  FaCalendarAlt,
  FaBars,
  FaSignInAlt,
} from "react-icons/fa";
import { DrawerButton } from "./Drawer.jsx";
import { useAuth } from "../../hooks/useAuth";

const navItems = [
  { label: "Inicio", icon: FaHome, path: "/" },
  { label: "Hoteles", icon: FaHotel, path: "/hotels" },
  { label: "Usuarios", icon: FaUserFriends, path: "/users" },
  { label: "Eventos", icon: FaCalendarAlt, path: "/events" },
];

export const Navbar = ({ toggleColorMode, colorMode }) => {
  const bg = useColorModeValue("rgba(41, 87, 105, 0.82)", "rgba(34,42,41,0.95)");
  const color = useColorModeValue("#F9F7F2", "#7bc2c4");
  const activeColor = "#7bc2c4";
  const menuBg = useColorModeValue("#ffffff", "#2A2A2A");
  const menuColor = useColorModeValue("#2E576A", "#fefefe");

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = isLoggedIn || !!user;

  return (
    <Flex
      as="nav"
      w="100vw"
      px={{ base: 4, md: 16 }}
      py={3}
      align="center"
      bg={bg}
      color={color}
      position="sticky"
      top={0}
      zIndex={100}
      boxShadow="0 4px 32px 0 rgba(44,98,117,0.15)"
      backdropFilter="blur(10px)"
    >
      <Box
        fontWeight="extrabold"
        fontSize="2xl"
        letterSpacing="wide"
        display="flex"
        alignItems="center"
        cursor="pointer"
        onClick={() => navigate("/")}
      >
        <Icon as={FaHome} mr={2} color="#b8807c" />
        Pompeii Hotel
      </Box>

      <Spacer />

      {/* Links en escritorio */}
      <HStack spacing={6} display={{ base: "none", md: "flex" }}>
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.label}
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
              color: isActive ? activeColor : color,
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              fontSize: "1.1em",
              transition: "color 0.2s",
            })}
          >
            <Icon as={item.icon} mr={1} />
            {item.label}
          </NavLink>
        ))}
      </HStack>

      {/* Menú hamburguesa móvil */}
      <Box display={{ base: "block", md: "none" }}>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FaBars />}
            variant="outline"
            color={color}
            borderColor="#7bc2c4"
            aria-label="Open menu"
          />
          <MenuList bg={menuBg} color={menuColor}>
            {navItems.map((item) => (
              <MenuItem
                key={item.label}
                icon={<Icon as={item.icon} />}
                bg={menuBg}
                _hover={{ bg: "#7bc2c4", color: "#2E576A" }}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </MenuItem>
            ))}
            {!isAuthenticated ? (
              <>
                <MenuItem
                  icon={<FaSignInAlt />}
                  onClick={() => navigate("/login")}
                >
                  Iniciar sesión
                </MenuItem>
                <MenuItem
                  icon={<FaUserFriends />}
                  onClick={() => navigate("/register")}
                >
                  Registrarse
                </MenuItem>
              </>
            ) : null}
          </MenuList>
        </Menu>
      </Box>

      <Spacer />

      {/* Botón perfil / login en escritorio */}
      {!isAuthenticated ? (
        <Button
          onClick={() => navigate("/login")}
          variant="outline"
          colorScheme="whiteAlpha"
          border="none"
          color={color}
          mr={3}
          leftIcon={<FaSignInAlt />}
        >
          Login
        </Button>
      ) : null}

      {/* DrawerButton para usuario autenticado */}
      {isAuthenticated && <DrawerButton />}
    </Flex>
  );
};
