import {apiPublic} from './apiPublic';
import {api} from './api';
import type {User} from '../types';

const TOKEN_KEY = 'molink-admin-token';

interface LoginResponse {
    success: boolean;
    token: string;
    user: User;
}

interface ProfileResponse {
    success: boolean;
    user?: User;
    profile?: User;
}

export const adminAuthService = {

    /**
     * Inicia sesión del administrador. Usa apiPublic (sin token).
     */
    async login(email: string, password: string): Promise<{ token: string; user: User }> {
        localStorage.removeItem(TOKEN_KEY);
        const response = await apiPublic.post<LoginResponse>('/api/admin/login', {email, password});
        const {token, user} = response.data;

        if (token && user) {
            localStorage.setItem(TOKEN_KEY, token);
            return {token, user};
        }

        throw new Error('Respuesta inesperada del servidor');
    },

    /**
     * Cierra sesión. Usa api (con token) para notificar al backend.
     */
    async logout(): Promise<void> {
        try {
            await api.post('/api/admin/logout');
        } catch (error) {
            console.error('La llamada de logout al backend falló, se cerrará la sesión localmente:', error);
        } finally {
            localStorage.removeItem(TOKEN_KEY);
        }
    },

    /**
     * Verifica si hay un token válido y recupera el perfil del usuario.
     * Usa api (con token).
     */
    async getProfile(): Promise<User | null> {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) return null;

        try {
            const response = await api.get<ProfileResponse>('/api/admin/profile');
            return response.data.user || response.data.profile || null;
        } catch {
            localStorage.removeItem(TOKEN_KEY);
            return null;
        }
    },

    /** Elimina el token del localStorage. */
    clearToken(): void {
        localStorage.removeItem(TOKEN_KEY);
    },
};

