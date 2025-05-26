import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:3000/manageMyStay/v1",
    timeout: 5000
})

apiClient.interceptors.request.use(
    (config) => {
      const userDetails = localStorage.getItem('user');
      if (userDetails) {
        // const token = JSON.parse(userDetails).token; // Usar cuando funcione el login
        // config.headers["x-token"] = token;
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2ODJjZmQ1MDQ2MWZiYjliODgzM2Y2OGMiLCJpYXQiOjE3NDgyMTQ3NjUsImV4cCI6MTc0ODIxODM2NX0.nYQH4xS_kKhfKPsRmyyP-lss5ZCdnW7l2Y15Jg4wdAc';
        config.headers["x-token"] = token; // Token de ejemplo
      }
      return config;
    },
    (error) => Promise.reject(error)
);

export const addRoom = async (data) => {
    try {
        console.log(data);
        return await apiClient.post('/room', data);
    } catch (e) {
        return { error: true, e };
    }
};

export const getRooms = async (hotelId) => {
    try {
        return await apiClient.get(`/room/${hotelId}`);
    } catch (e) {
        return { error: true, e };
    }
};

export const updateRoom = async (roomId, data) => {
    try {
        return await apiClient.put(`room/updateRoom/${roomId}`, data);
    } catch (e) {
        return { error: true, e };
    }
};

export const deleteRoom = async (roomId) => {
    try {
        console.log("roomId a eliminar:", roomId);
        return await apiClient.delete(`/room/${roomId}`);
    } catch (e) {
        return { error: true, e };
    }
};