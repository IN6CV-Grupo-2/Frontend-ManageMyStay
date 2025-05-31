import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import {
    getBills as getBillsRequest,
    getBillById as getBillByIdRequest,
    createBill as createBillRequest,
    updateBill as updateBillRequest,
    deleteBill as deleteBillRequest,
    createBillFromReservation as createBillFromReservationRequest
} from "../services/api.jsx";

export const useBills = () => {
    const [bills, setBills] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getBills = async () => {
        setIsLoading(true);
        try {
            const res = await getBillsRequest();
            setBills(res?.data || []);
            setError(null);
        } catch (err) {
            toast.error("Error al obtener facturas");
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const createBill = async (data) => {
        const res = await createBillRequest(data);
        if (res.error) {
            toast.error(res.e?.response?.data?.msg || "Error al crear factura");
            setError(res.e?.message || "Error al crear factura");
        } else {
            toast.success("Factura creada correctamente");
            setError(null);
            await getBills();
        }
    };

    const createAutoBill = async (reservationId) => {
        const res = await createBillFromReservationRequest(reservationId);
        if (res.error) {
            toast.error(res.e?.response?.data?.msg || "Error al generar factura automática");
            setError(res.e?.message || "Error al generar factura automática");
        } else {
            toast.success("Factura automática creada");
            setError(null);
            await getBills();
        }
    };

    const getBillById = async (id) => {
        const res = await getBillByIdRequest(id);
        if (res.error) {
            toast.error(res.e?.response?.data?.msg || "Error al obtener factura");
            setError(res.e?.message || "Error al obtener factura");
            return null;
        }
        setError(null);
        return res.data?.bill;
    };

    const editBill = async (id, data) => {
        const res = await updateBillRequest(data, id);
        if (res.error) {
            toast.error(res.e?.response?.data?.msg || "Error al actualizar factura");
            setError(res.e?.message || "Error al actualizar factura");
        } else {
            toast.success("Factura actualizada correctamente");
            setError(null);
            await getBills();
        }
    };

    const removeBill = async (id) => {
        const res = await deleteBillRequest(id);
        if (res.error) {
            toast.error(res.e?.response?.data?.msg || "Error al eliminar factura");
            setError(res.e?.message || "Error al eliminar factura");
        } else {
            toast.success("Factura eliminada");
            setError(null);
            await getBills();
        }
    };

    useEffect(() => {
        getBills();
    }, []);

    return {
        bills,
        isLoading,
        error,
        getBills,
        createBill,
        createAutoBill,
        getBillById,
        editBill,
        removeBill,
        refresh: getBills,
    };
};