import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Heading,
  VStack,
  useToast,
  Text,
  Link as ChakraLink,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast({
        title: 'Login exitoso',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error al iniciar sesión',
        description: error.message || 'Verifica tus credenciales',
        status: 'error',
        duration: 4000,
        isClosable: true
      });
    }
  };

  const handleBlur = (field) => () => {
    setTouched({ ...touched, [field]: true });
  };

  const isEmailInvalid = touched.email && email.trim() === '';
  const isPasswordInvalid = touched.password && password.trim() === '';

  return (
    <Box maxW="400px" mx="auto" mt="10">
      <Heading textAlign="center" mb="6">
        Iniciar Sesión
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing="4">
          <FormControl isInvalid={isEmailInvalid}>
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaEnvelope color="gray" />
              </InputLeftElement>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleBlur("email")}
                placeholder="correo@ejemplo.com"
              />
            </InputGroup>
            {isEmailInvalid && (
              <FormErrorMessage>El email es requerido</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={isPasswordInvalid}>
            <FormLabel>Contraseña</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaLock color="gray" />
              </InputLeftElement>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handleBlur("password")}
                placeholder="********"
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
            {isPasswordInvalid && (
              <FormErrorMessage>La contraseña es requerida</FormErrorMessage>
            )}
          </FormControl>

          <Button
            colorScheme="teal"
            width="full"
            type="submit"
            isLoading={isLoading}
            loadingText="Ingresando..."
          >
            Ingresar
          </Button>

          <Text fontSize="sm" mt={4}>
            ¿No tienes cuenta?{' '}
            <ChakraLink as={Link} to="/register" color="teal.500">
              Regístrate aquí
            </ChakraLink>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default LoginForm;
