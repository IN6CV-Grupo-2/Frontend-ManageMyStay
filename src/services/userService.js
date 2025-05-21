const API_URL = 'http://localhost:3000/manageMyStay/v1/user'; // Cambiar "users" por "user"

export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export const loginUser = async (credentials) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });
    return response.json();
};

export const fetchUsers = async () => {
    const response = await fetch(API_URL, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }, // Si usas JWT
    });
    if (!response.ok) throw new Error('Error al obtener los usuarios');
    const data = await response.json();
    return data.users; // Acceder a la propiedad "users"
};

export const updateUser = async (id, userData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}` // si tu backend lo requiere
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        // Opcional: imprime el error del backend
        const errorText = await response.text();
        console.error("Error backend:", errorText);
        throw new Error('Error al actualizar el usuario');
    }
    return response.json();
};


export const deleteUser = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH", // O "PUT"
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: false }),
    });
    if (!response.ok) throw new Error('Error al desactivar el usuario');
    return response.json();
};