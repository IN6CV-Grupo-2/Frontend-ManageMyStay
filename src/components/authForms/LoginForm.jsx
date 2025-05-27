import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  Text,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { FaSignInAlt, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

const meddleBg = "linear-gradient(135deg, #2E576A 0%, #B8807C 60%, #7BC2C4 100%)";

const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const cardBg = useColorModeValue("#F9F7F2", "#2E2A29");
  const inputBorder = "#7bc2c4";

  const handleBlur = (field) => () => setTouched({ ...touched, [field]: true });
  const isEmailInvalid = touched.email && email.trim() === '';
  const isPasswordInvalid = touched.password && password.trim() === '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast({
        title: 'Inicio de sesión exitoso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error al iniciar sesión',
        description: error.message || 'Verifica tus credenciales',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
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
          <Icon as={FaSignInAlt} boxSize={10} color="#b8807c" />
          <Heading fontSize="2xl" fontWeight="extrabold" color="#2e576a">
            Iniciar Sesión
          </Heading>
        </Stack>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4} isInvalid={isEmailInvalid} isRequired>
            <FormLabel color="#b8807c">Correo electrónico</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaEnvelope color="gray" />
              </InputLeftElement>
              <Input
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleBlur("email")}
                borderColor={inputBorder}
                focusBorderColor="#2e576a"
              />
            </InputGroup>
          </FormControl>
          <FormControl mb={6} isInvalid={isPasswordInvalid} isRequired>
            <FormLabel color="#b8807c">Contraseña</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaLock color="gray" />
              </InputLeftElement>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handleBlur("password")}
                borderColor={inputBorder}
                focusBorderColor="#2e576a"
              />
              <InputRightElement>
                <IconButton
                  variant="ghost"
                  size="sm"
                  icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Mostrar contraseña"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack direction="row" spacing={4} justify="center">
            <Button type="submit" colorScheme="teal" isLoading={isLoading} loadingText="Ingresando...">
              Iniciar Sesión
            </Button>
          </Stack>
          <Stack mt={4} align="center">
            <Text color="#2e576a">
              ¿No tienes una cuenta?{" "}
              <Button variant="link" color="#b8807c" onClick={() => navigate("/register")}>
                Regístrate
              </Button>
            </Text>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default LoginForm;
