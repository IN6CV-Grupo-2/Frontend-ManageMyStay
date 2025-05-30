import axios from 'axios';

const API_URL = 'http://localhost:3000/manageMyStay/v1/user';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token en header 'x-token'
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('x-token');
  if (token) {
    config.headers['x-token'] = token;  // <-- aquí también 'x-token'
  }
  return config;
});

export const fetchUsers = async () => {
  try {
    const response = await api.get('/');
    return response.data.users;
  } catch (error) {
    console.error('Error en fetchUsers:', error);
    throw error.response?.data || { message: 'Error al obtener los usuarios' };
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error en updateUser:', error.response?.data || error);
    throw error.response?.data || { message: 'Error al actualizar el usuario' };
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error en deleteUser:', error.response?.data || error);
    throw error.response?.data || { message: 'Error al desactivar el usuario' };
  }
};

export const fetchCurrentUser = async () => {
  try {
    const response = await api.get('/profile'); 
    return response.data.user;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error.response?.data || { message: 'Error al obtener el usuario actual' };
  }
};

export const updatedPassword = async (id, payload) => {
  try {
    const response = await api.put(`/updatePassword/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error en updatedPassword:', error);
    throw error.response?.data || { message: 'Error al actualizar la contraseña' };
  }
};
