import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    getServices as getServicesRequest,
    getServiceById as getServiceByIdRequest,
    saveService as saveServiceRequest,
    updateService as updateServiceRequest,
    deleteService as deleteServiceRequest,
} from "../../services/api.jsx";

export const useServices = () => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getServices = async () => {
        setIsLoading(true);
        try {
            const res = await getServicesRequest();
            console.log("🔍 Respuesta completa de la API:", res);
            setServices(res?.data?.services || []);
        } catch (err) {
            toast.error("Error getting services");
            setServices([]);
        } finally {
            setIsLoading(false);
        }
    };

    const createService = async (data) => {
        const res = await saveServiceRequest(data);
        if (res.error) {
            toast.error(res.e?.response?.data?.message || "Error saving service");
        } else {
            toast.success("Service created");
            await getServices();
        }
    };

    const getServiceById = async (id) => {
        const res = await getServiceByIdRequest(id);
        if (res.error) {
            toast.error(res.e?.response?.data?.message || "Error getting service");
        }
        return res.data?.service;
    };

    const editService = async (id, data) => {
        const res = await updateServiceRequest(data, id);
        if (res.error) {
            toast.error(res.e?.response?.data?.message || "Error updating service");
        } else {
            toast.success("Service updated");
            await getServices();
        }
    };

    const removeService = async (id) => {
        const res = await deleteServiceRequest(id);
        if (res.error) {
            toast.error(res.e?.response?.data?.message || "Error deleting service");
        } else {
            toast.success("Service deleted");
            await getServices();
        }
    };

    useEffect(() => {
        getServices();
    }, []);

    return {
        services,
        isLoading,
        getServices,
        createService,
        getServiceById,
        editService,
        removeService,
        refresh: getServices,
    };
};