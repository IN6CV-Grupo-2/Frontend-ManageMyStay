import { useState, useEffect } from 'react';
import {
  createEventService,
  getEventsByHotelService,
  getEventByIdService,
  updateEventService,
  cancelEventService,
  addServicesToEventService,
  removeServicesFromEventService,
} from '../services/event.service';

export const useEvents = (hotelId) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar eventos del hotel automáticamente
  useEffect(() => {
    if (!hotelId) return;

    const fetchEvents = async () => {
      setLoading(true);
      try {
        const data = await getEventsByHotelService(hotelId);
        setEvents(data.events);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.msg || 'Error al obtener eventos');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [hotelId]);

  // Funciones para manipular eventos
  const createEvent = async (eventData) => {
    try {
      const newEvent = await createEventService(eventData);
      setEvents((prev) => [...prev, newEvent]);
      return newEvent;
    } catch (err) {
      throw new Error(err.response?.data?.msg || 'Error al crear evento');
    }
  };

  const updateEvent = async (eventId, updatedData) => {
    try {
      const updated = await updateEventService(eventId, updatedData);
      setEvents((prev) =>
        prev.map((ev) => (ev._id === eventId ? updated : ev))
      );
      return updated;
    } catch (err) {
      throw new Error(err.response?.data?.msg || 'Error al actualizar evento');
    }
  };

  const cancelEvent = async (eventId) => {
    try {
      await cancelEventService(eventId);
      setEvents((prev) => prev.filter((ev) => ev._id !== eventId));
    } catch (err) {
      throw new Error(err.response?.data?.msg || 'Error al cancelar evento');
    }
  };

  const addServices = async (eventId, serviceIds) => {
    try {
      return await addServicesToEventService(eventId, serviceIds);
    } catch (err) {
      throw new Error(err.response?.data?.msg || 'Error al agregar servicios');
    }
  };

  const removeServices = async (eventId, serviceIds) => {
    try {
      return await removeServicesFromEventService(eventId, serviceIds);
    } catch (err) {
      throw new Error(err.response?.data?.msg || 'Error al quitar servicios');
    }
  };

  const getEventById = async (eventId) => {
    try {
      return await getEventByIdService(eventId);
    } catch (err) {
      throw new Error(err.response?.data?.msg || 'Error al obtener evento');
    }
  };

  return {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    cancelEvent,
    addServices,
    removeServices,
    getEventById,
  };
};