import axios from 'axios';

/**
 * Instancia de Axios para rutas PÚBLICAS que no requieren autenticación.
 */
export const apiPublic = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});