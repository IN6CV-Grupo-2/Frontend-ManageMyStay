import axios from "./api.js";



export const saveService = async (data) => {
    try {
        const res = await axios.post('/service/save/', data);
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
        const res = await axios.get('/service/');
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
        const res = await axios.put(`/service/update/${servicesId}`, data);
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
        return await axios.delete(`/service/delete/${servicesId}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getServiceById = async (servicesId) => {
    try {
        return await axios.get(`/services/search/${servicesId}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const createBill = async (data) => {
    try {
        const res = await axios.post('/bill/', data);
        return { data: res.data, error: false };
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getBills = async () => {
    try {
        const res = await axios.get('/bill/');
        return { data: res.data, error: false };
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getBillById = async (billId) => {
    try {
        return await axios.get(`/bill/${billId}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const updateBill = async (data, billId) => {
    try {
        const res = await axios.put(`/bill/${billId}`, data);
        return { data: res.data, error: false };
    } catch (e) {
        return { 
            error: true,
            e
        }
    }
}

export const deleteBill = async (billId) => {
    try {
        return await axios.delete(`/bill/${billId}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}