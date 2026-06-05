import { apiPublic } from './apiPublic.ts';
import { apiClient } from '../store/apiClient.ts';
import type { CustomerApiUser, CustomerVerifyCodeResponse } from '../../types';

/**
 * Servicio canónico de autenticación de clientes (passwordless OTP).
 */
export const customerAuthService = {

    async requestCode(email: string): Promise<void> {
        await apiPublic.post('/api/auth/request-code', { email });
    },

    /**
     * Verifica el OTP. El backend establece la cookie HttpOnly con el JWT
     */
    async verifyCode(email: string, code: string): Promise<{ user: CustomerApiUser }> {
        const res = await apiPublic.post<CustomerVerifyCodeResponse>(
            '/api/auth/verify-code',
            { email, code },
        );
        if (!res.data?.user) throw new Error('El servidor no devolvió datos de usuario válidos.');
        return { user: res.data.user };
    },

    /**
     * Verifica la sesión activa llamando a GET /api/auth/me.
     */
    async checkSession(): Promise<CustomerApiUser | null> {
        try {
            const res = await apiClient.get<{ user: CustomerApiUser }>('/api/auth/me');
            return res.data?.user ?? null;
        } catch {
            return null;
        }
    },

    /**
     * Cierra la sesión notificando al backend para que elimine la cookie.
     */
    async logout(): Promise<void> {
        try {
            await apiClient.post('/api/auth/logout');
        } catch {
        }
    },
};
