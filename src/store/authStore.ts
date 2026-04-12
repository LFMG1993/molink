import {create} from 'zustand';
import {adminAuthService} from '../services/adminAuthService';
import type {User} from '../types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    verifyAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    login: async (email, password) => {
        try {
            const {user} = await adminAuthService.login(email, password);
            set({user, isAuthenticated: true, isLoading: false});
            return {success: true};
        } catch (error: any) {
            set({isLoading: false});
            return {success: false, error: error.message};
        }
    },

    logout: async () => {
        await adminAuthService.logout();
        set({user: null, isAuthenticated: false});
    },

    verifyAuth: async () => {
        set({isLoading: true});
        try {
            const user = await adminAuthService.getProfile();
            if (user) {
                set({user, isAuthenticated: true, isLoading: false});
            } else {
                set({user: null, isAuthenticated: false, isLoading: false});
            }
        } catch {
            adminAuthService.clearToken();
            set({user: null, isAuthenticated: false, isLoading: false});
        }
    },
}));