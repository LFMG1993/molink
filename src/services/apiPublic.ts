import axios from 'axios';

/**
 * Instancia de Axios para rutas PÚBLICAS que no requieren autenticación.
 * NO envía ningún token. Acceso libre.
 * Uso: consultar productos, categorías, login, registro, etc.
 */
export const apiPublic = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {'Content-Type': 'application/json'},
});