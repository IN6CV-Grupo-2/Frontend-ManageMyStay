import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/manageMyStay/v1',
    timeout: 5000
})

apiClient.interceptors.request.use(
    (config) => {
        const useUserDetails = localStorage.getItem('user');

        if (useUserDetails) {
            const token = JSON.parse(useUserDetails).token
            config.headers["x-token"] = token
        }
        return config
    },
    (e) => {
        return Promise.reject(e);
    }
)

export const saveService = async (data) => {
    try {
        const res = await apiClient.post('/service/save/', data);
        return { data: res.data, error: false };
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const getServices = async () => {
    try {
        const res = await apiClient.get('/service/');
        return { data: res.data, error: false };
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const updateService = async (data, servicesId) => {
    try {
        const res = await apiClient.put(`/service/update/${servicesId}`, data);
        return { data: res.data, error: false };
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const deleteService = async (servicesId) => {
    try {
        return await apiClient.delete(`/service/delete/${servicesId}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getServiceById = async (servicesId) => {
    try {
        return await apiClient.get(`/services/search/${servicesId}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}