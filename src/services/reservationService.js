import api from "./api.js";

export const getReservationByUser = async (id) => {
    try {
        const response = await api.get(`/reservation/reservationUser/${id}`);
        return response.data
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getReservationByHotel = async () => {
    try {
        const response = await api.get(`/reservation/`);
        return response.data;
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const createReservation = async (data) => {
    try {
        const response = await api.post('/reservation', data);
        return response.data
    } catch (error) {
       if (error.response) {
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

export const cancelReservation = async(id) => {
    try {
        const response = await api.delete(`/reservation/${id}`);
        return response.data
    } catch (error) {
        if (error.response) {
        console.error('Error status:', error.response.status);
        console.error('Error data:', error.response.data);
        return { success: false, status: error.response.status, data: error.response.data };
        } else {
        console.error('Error:', error.message);
        return { success: false, message: error.message };
        }
    }
}

export const updateReservation = async (id, data) => {
    try {
        const res = await api.put(`/reservation/${id}`, data);
        return res.data;
    } catch (e) {
        return { error: true, e };
    }
};

export const getReservationById = async (id) => {
    try {
        const res = await api.get(`/reservation/findReservation/${id}`);
        return res.data;
    } catch (e) {
        return { error: true, e };
    }
};