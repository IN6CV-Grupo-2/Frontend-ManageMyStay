import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { authService } from '../../services/authService';

const meddleBg = "linear-gradient(135deg, #2E576A 0%, #B8807C 60%, #7BC2C4 100%)";

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

  const cardBg = useColorModeValue("#F9F7F2", "#2E2A29");
  const inputBorder = "#7bc2c4";

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

    console.log("Datos a enviar:", {
      name: form.name,
      surname: form.surname,
      email: form.email,
      password: form.password,
    });

    try {
      await authService.register({
        name: form.name,
        surname: form.surname,
        email: form.email,
        password: form.password,
      });

      toast({
        title: 'Usuario registrado',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
    } catch (error) {
      console.error("Error al registrar:", error);
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
          <Icon as={FaUserPlus} boxSize={10} color="#b8807c" />
          <Heading fontSize="2xl" fontWeight="extrabold" color="#2e576a">
            Crear cuenta
          </Heading>
        </Stack>
        <form onSubmit={handleSubmit}>
          {[
            { name: "name", label: "Nombre", icon: FaUser },
            { name: "surname", label: "Apellido", icon: FaUser },
            { name: "email", label: "Correo electrónico", icon: FaEnvelope, type: "email" }
          ].map(({ name, label, icon, type = "text" }) => (
            <FormControl key={name} mb={4} isInvalid={isInvalid(name)} isRequired>
              <FormLabel color="#b8807c">{label}</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  {React.createElement(icon, { color: "gray" })}
                </InputLeftElement>
                <Input
                  name={name}
                  type={type}
                  placeholder={label}
                  value={form[name]}
                  onChange={handleChange(name)}
                  onBlur={handleBlur(name)}
                  borderColor={inputBorder}
                  focusBorderColor="#2e576a"
                />
              </InputGroup>
            </FormControl>
          ))}

          <FormControl mb={4} isInvalid={isInvalid('password')} isRequired>
            <FormLabel color="#b8807c">Contraseña</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaLock color="gray" />
              </InputLeftElement>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
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

          <FormControl mb={6} isInvalid={isPasswordMismatch} isRequired>
            <FormLabel color="#b8807c">Confirmar Contraseña</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaLock color="gray" />
              </InputLeftElement>
              <Input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirmar Contraseña"
                value={form.confirmPassword}
                onChange={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                borderColor={inputBorder}
                focusBorderColor="#2e576a"
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
          </FormControl>

          <Stack direction="row" spacing={4} justify="center">
            <Button type="submit" colorScheme="teal">Registrarse</Button>
          </Stack>

          <Stack mt={4} align="center">
            <Button variant="link" color="#b8807c" onClick={() => navigate("/login")}>
              ¿Ya tienes cuenta? Inicia sesión
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default RegisterForm;
