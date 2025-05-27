import axios from 'axios';

const API_URL = 'http://localhost:3000/manageMyStay/v1/hotel';

// Crear instancia de Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
});

/**
 * Obtener todos los hoteles.
 */
export const fetchHotels = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error en fetchHotels:', error);
    throw error.response?.data || { message: 'Error al obtener hoteles' };
  }
};

/**
 * Añadir un nuevo hotel.
 * @param {Object} hotelData
 */
export const addHotel = async (hotelData) => {
  try {
    const response = await api.post('/', hotelData);
    return response.data;
  } catch (error) {
    console.error('Error en addHotel:', error);
    throw error.response?.data || { message: 'Error al añadir hotel' };
  }
};

/**
 * Actualizar un hotel.
 * @param {string} id
 * @param {Object} hotel
 */
export const updateHotel = async (id, hotel) => {
  try {
    const response = await api.put(`/${id}`, hotel);
    return response.data;
  } catch (error) {
    console.error('Error en updateHotel:', error);
    throw error.response?.data || { message: 'Error al actualizar hotel' };
  }
};

/**
 * Eliminar un hotel.
 * @param {string} id
 */
export const deleteHotel = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error en deleteHotel:', error);
    throw error.response?.data || { message: 'Error al eliminar hotel' };
  }
};
