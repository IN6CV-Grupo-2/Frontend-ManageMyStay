import { Flex, Box, Button, IconButton, HStack, useColorModeValue, Spacer, Text, Menu, MenuButton, MenuList, MenuItem, Icon } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHotel, FaUserFriends, FaHome, FaCalendarAlt, FaBars, FaMoon, FaSun } from "react-icons/fa";
import { DrawerButton } from './Drawer.jsx';
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

import { useAuth } from '../../hooks/useAuth';
 
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
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  
  console.log("isLoggedIn navbar:", isLoggedIn); // esto debe cambiar al loguearse

  


  const handleAuthClick = () => {
    if (isLoggedIn) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };
 
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
        ManageMyStay
      </Box>
      <Spacer />
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
          <MenuList bg={bg} color={color}>
            {navItems.map((item) => (
              <MenuItem
                key={item.label}
                icon={<Icon as={item.icon} />}
                bg={bg}
                _hover={{ bg: "#7bc2c4", color: "#2E576A" }}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
      <Spacer />
      <Button
        onClick={handleAuthClick}
        variant="outline"
        colorScheme="whiteAlpha"
        border="none"
        color={color}
        mr={3}
        leftIcon={isLoggedIn ? <FaSignOutAlt /> : <FaSignInAlt />}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </Button>
      <DrawerButton />
    </Flex>
  );
};