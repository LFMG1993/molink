import axios from 'axios';

/**
 * Instancia de Axios para rutas del USUARIO COMERCIAL (cliente de la tienda).
 * Inyecta automáticamente el token de cliente (molink-customer-token) en cada petición.
 * Uso: perfil del cliente, direcciones, historial de pedidos, etc.
 */
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {'Content-Type': 'application/json'},
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('molink-customer-token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});