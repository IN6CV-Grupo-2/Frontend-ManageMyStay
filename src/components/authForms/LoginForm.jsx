import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Heading,
  VStack,
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlur('email')}
              placeholder="correo@ejemplo.com"
            />
            {isEmailInvalid && <FormErrorMessage>El email es requerido</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={isPasswordInvalid}>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handleBlur('password')}
              placeholder="********"
            />
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
        </VStack>
      </form>
    </Box>
  );
};

export default LoginForm;
