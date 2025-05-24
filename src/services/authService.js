import axios from 'axios';

const API_URL = 'http://localhost:3000/manageMyStay/v1/auth';

/**
 * Realiza el login del usuario.
 * Guarda el token en localStorage bajo la clave 'token'.
 * @param {string} email
 * @param {string} password
 * @returns {Object} Datos del usuario con token.
 */
const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });

    const { token } = response.data.userDetails;

    // Guardar token para uso futuro
    localStorage.setItem('token', token);

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login error' };
  }
};

/**
 * Registra un nuevo usuario.
 * @param {Object} userData - { name, surname, email, password }
 * @returns {Object} Detalles del nuevo usuario registrado.
 */
const register = async ({ name, surname, email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      surname,
      email,
      password
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration error' };
  }
};

export const authService = {
  login,
  register
};
