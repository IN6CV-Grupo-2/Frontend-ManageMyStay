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
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleBlur = (field) => () => {
    setTouched({ ...touched, [field]: true });
  };

  const isInvalid = (field) => touched[field] && form[field].trim() === '';
  const isPasswordMismatch = touched.confirmPassword && form.password !== form.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast({
        title: 'Las contraseñas no coinciden',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    try {
      await authService.register(form);
      toast({
        title: 'Usuario registrado',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Error al registrar',
        description: error.message || 'Intenta con otro correo',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt="10">
      <Heading textAlign="center" mb="6">
        Crear cuenta
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing="4">
          <FormControl isInvalid={isInvalid('name')}>
            <FormLabel>Nombre</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaUser color="gray" />
              </InputLeftElement>
              <Input
                value={form.name}
                onChange={handleChange('name')}
                onBlur={handleBlur('name')}
                placeholder="Tu nombre"
              />
            </InputGroup>
            <FormErrorMessage>El nombre es requerido</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={isInvalid('surname')}>
            <FormLabel>Apellido</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaUser color="gray" />
              </InputLeftElement>
              <Input
                value={form.surname}
                onChange={handleChange('surname')}
                onBlur={handleBlur('surname')}
                placeholder="Tu apellido"
              />
            </InputGroup>
            <FormErrorMessage>El apellido es requerido</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={isInvalid('email')}>
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaEnvelope color="gray" />
              </InputLeftElement>
              <Input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="correo@ejemplo.com"
              />
            </InputGroup>
            <FormErrorMessage>El email es requerido</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={isInvalid('password')}>
            <FormLabel>Contraseña</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaLock color="gray" />
              </InputLeftElement>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
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
            <FormErrorMessage>La contraseña es requerida</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={isPasswordMismatch}>
            <FormLabel>Confirmar Contraseña</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaLock color="gray" />
              </InputLeftElement>
              <Input
                type={showConfirm ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                placeholder="********"
              />
              <InputRightElement>
                <IconButton
                  variant="ghost"
                  size="sm"
                  icon={showConfirm ? <FaEyeSlash /> : <FaEye />}
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label="Mostrar confirmación"
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>Las contraseñas no coinciden</FormErrorMessage>
          </FormControl>

          <Button colorScheme="teal" width="full" type="submit">
            Registrarse
          </Button>

          <Text fontSize="sm">
            ¿Ya tienes cuenta?{' '}
            <ChakraLink as={Link} to="/login" color="teal.500">
              Inicia sesión aquí
            </ChakraLink>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default RegisterForm;
