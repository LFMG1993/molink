import { apiPublic } from '../shared/apiPublic.ts';
import { api } from './api.ts';
import type { User } from '../../types';

/**
 * Servicio de autenticación para administradores.
 */

interface LoginResponse {
    success: boolean;
    token?: string;
    user: User;
}

interface ProfileResponse {
    success: boolean;
    user?: User;
    profile?: User;
}

export const adminAuthService = {

    /**
     * Inicia sesión del administrador. El backend establece la cookie HttpOnly.
     */
    async login(email: string, password: string): Promise<{ user: User }> {
        const response = await apiPublic.post<LoginResponse>('/api/admin/login', { email, password });
        const { user } = response.data;

        if (user) {
            return { user };
        }

        throw new Error('Respuesta inesperada del servidor');
    },

    /**
     * Cierra sesión. El backend elimina la cookie HttpOnly en su respuesta.
     */
    async logout(): Promise<void> {
        try {
            await api.post('/api/admin/logout');
        } catch (error) {
            console.error('La llamada de logout al backend falló, se cerrará la sesión localmente:', error);
        }
    },

    /**
     * Verifica la sesión activa recuperando el perfil del admin.
     */
    async getProfile(): Promise<User | null> {
        try {
            const response = await api.get<ProfileResponse>('/api/admin/profile');
            return response.data.user || response.data.profile || null;
        } catch {
            return null;
        }
    },

    clearToken(): void {
    },
};
