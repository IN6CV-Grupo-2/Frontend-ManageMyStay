import axios from "axios";

const apiClient  = axios.create({
    baseURL: 'http://127.0.0.1:3000/storageSystem/',
    timeout: 5000
})

apiClient.interceptors.request.use(
    (config) => {
        const useUserDetails = localStorage.getItem('user');

        if(useUserDetails){
            const token = JSON.parse(useUserDetails).token
            config.headers["x-token"] = token;
        }
        return config
    },
    (e) => {
        return Promise.reject(e);
    }
)
































export const searchReservations = async (reservationId) => {
    try {
        return await apiClient.get(`/reservation/${reservationId}`);
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}