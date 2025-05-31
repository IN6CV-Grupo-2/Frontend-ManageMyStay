import api from "./api.js";



export const saveService = async (data) => {
    try {
        const res = await api.post('/service/save/', data);
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
        const res = await api.get('/service/');
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
        const res = await api.put(`/service/update/${servicesId}`, data);
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
        return await api.delete(`/service/delete/${servicesId}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getServiceById = async (servicesId) => {
    try {
        return await api.get(`/services/search/${servicesId}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const createBill = async (data) => {
    try {
        const res = await api.post('/bill/', data);
        return { data: res.data, error: false };
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const createBillFromReservation = async (reservationId) => {
    try {
        const res = await api.post('/bill/auto', { reservationId });
        return { data: res.data, error: false };
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const getBills = async () => {
    try {
        const res = await api.get('/bill/');
        return { data: res.data, error: false };
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const getBillById = async (billId) => {
    try {
        const res = await api.get(`/bill/${billId}`);
        return { data: res.data, error: false };
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const updateBill = async (data, billId) => {
    try {
        const res = await api.put(`/bill/${billId}`, data);
        return { data: res.data, error: false };
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const deleteBill = async (billId) => {
    try {
        const res = await api.delete(`/bill/${billId}`);
        return { data: res.data, error: false };
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};
