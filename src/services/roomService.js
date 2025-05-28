import axios from 'axios';

const API_URL = 'http://localhost:3000/manageMyStay/v1/room';

// Crear una nueva instancia de Axios
const apiRoom = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token dinámicamente desde localStorage
apiRoom.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // debe guardarse como 'token' al hacer login
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Obtener habitaciones por hotel
export const getRooms = async (Id) => {
  try {
    const response = await apiRoom.get(`/${Id}`);
    return response.data;
  } catch (error) {
    console.error('Error en getRooms:', error);
    throw error.response?.data || { message: 'Error al obtener habitaciones' };
  }
};

// Añadir nueva habitación
export const addRoom = async (data) => {
  try {
    const response = await apiRoom.post('/', data);
    return response.data;
  } catch (error) {
    console.error('Error en addRoom:', error);
    throw error.response?.data || { message: 'Error al añadir habitación' };
  }
};

// Actualizar una habitación
export const updateRoom = async (roomId, data) => {
  try {
    const response = await apiRoom.put(`/updateRoom/${roomId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error en updateRoom:', error);
    throw error.response?.data || { message: 'Error al actualizar habitación' };
  }
};

// Eliminar una habitación
export const deleteRoom = async (roomId) => {
  try {
    const response = await apiRoom.delete(`/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Error en deleteRoom:', error);
    throw error.response?.data || { message: 'Error al eliminar habitación' };
  }
};
