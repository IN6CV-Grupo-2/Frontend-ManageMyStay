import axios from './api.js';

export const createEvent = async (eventData) => {
  const { data } = await axios.post("/event/", eventData);
  return data;
};

export const getAllEvents = async () => {
  try {
    const response = await axios.get('/event/');
    return response.data;
  } catch (error) {
    console.error('Error fetching all events:', error);
    throw error.response?.data || { message: 'Unexpected error' };
  }
};

export const getEventsByHotel = async (hotelId) => {
  try {
    const response = await axios.get(`/events/hotel/${hotelId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events by hotel:', error);
    throw error.response?.data || { message: 'Unexpected error' };
  }
};

export const getHotelsService = async () => {
  const res = await axios.get("/hotel/");
  return res.data;
}

export const getServices = async () => {
  const { data } = await axios.get("/service/");
  return data.services;
};

export const getEventByIdService = async (eventId) => {
  const { data } = await axios.get(`/event/${eventId}`);
  return data;
};

export const updateEventService = async (eventId, updatedData) => {
  const { data } = await axios.put(`/event/${eventId}`, updatedData);
  return data;
};

export const cancelEventService = async (eventId) => {
  const { data } = await axios.delete(`/event/${eventId}`);
  return data;
};

export const addServicesToEventService = async (eventId, serviceIds) => {
  const { data } = await axios.post(`/events/add-services/${eventId}`, {
    services: serviceIds,
  });
  return data;
};

export const removeServicesFromEventService = async (eventId, serviceIds) => {
  const { data } = await axios.delete(`/events/remove-services/${eventId}`, {
    data: { services: serviceIds }, 
  });
  return data;
};
