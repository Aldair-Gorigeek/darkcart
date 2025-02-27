import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; // Gateway

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// 🔹 Obtener operaciones de un usuario
export const getOperacionesByUsuario = async (usuarioId) => {
    try {
        const response = await api.get(`/operaciones/usuario/${usuarioId}`);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo operaciones:", error);
        return [];
    }
};

// 🔹 Crear una nueva operación (individual)
export const createOperacion = async (operacion) => {
    try {
        const response = await api.post(`/operaciones`, operacion);
        return response.data;
    } catch (error) {
        console.error("Error creando operación:", error);
        return null;
    }
};

// 🔹 Crear múltiples operaciones en una sola petición
export const createOperaciones = async (operaciones) => {
    try {
        const response = await api.post(`/operaciones/lote`, operaciones);
        return response.data;
    } catch (error) {
        console.error("Error creando operaciones en lote:", error);
        return null;
    }
};

// 🔹 Obtener los facets desde Elasticsearch
export const getFacets = async () => {
    try {
        const response = await api.get("/items/facets");
        return response.data;
    } catch (error) {
        console.error("Error obteniendo facets:", error);
        return {};
    }
};

export default api;
