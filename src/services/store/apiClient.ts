import axios from 'axios';

/**
 * Instancia de Axios para rutas del USUARIO COMERCIAL.
 */
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});