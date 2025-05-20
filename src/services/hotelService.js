const API_URL = 'http://localhost:3000/manageMyStay/v1/hotel'; // URL corregida

// Funciones para llamadas a APIs (ejemplo de estructura)
export const fetchHotels = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener los hoteles');
  return response.json();
};

export const addHotel = async (hotel) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hotel),
  });
  if (!response.ok) throw new Error('Error al añadir el hotel');
  return response.json();
};

export const updateHotel = async (id, hotel) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hotel),
  });
  if (!response.ok) throw new Error('Error al actualizar el hotel');
  return response.json();
};

export const deleteHotel = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Error al eliminar el hotel');
  return response.json();
};
