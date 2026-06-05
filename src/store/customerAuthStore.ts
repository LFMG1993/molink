import { create } from 'zustand';
import { customerAuthService } from '../services/shared/customerAuthService.ts';
import type { Customer, CustomerApiUser } from '../types';

/** Mapea la respuesta de la API */
function toCustomer(apiUser: CustomerApiUser): Customer {
    return {
        userId: Number(apiUser.id),
        email: apiUser.email,
        name: apiUser.nombre,
        rol: apiUser.rol,
    };
}

interface CustomerAuthState {
    customer: Customer | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    initialize: () => Promise<void>;
    login: (apiUser: CustomerApiUser) => void;
    logout: () => Promise<void>;
}

export const useCustomerAuthStore = create<CustomerAuthState>((set) => ({
    customer: null,
    isAuthenticated: false,
    isLoading: true,

    initialize: async () => {
        set({ isLoading: true });
        try {
            const apiUser = await customerAuthService.checkSession();
            if (apiUser) {
                set({ customer: toCustomer(apiUser), isAuthenticated: true, isLoading: false });
            } else {
                set({ customer: null, isAuthenticated: false, isLoading: false });
            }
        } catch {
            set({ customer: null, isAuthenticated: false, isLoading: false });
        }
    },

    login: (apiUser: CustomerApiUser) => {
        set({ customer: toCustomer(apiUser), isAuthenticated: true, isLoading: false });
    },

    logout: async () => {
        set({ customer: null, isAuthenticated: false });
        await customerAuthService.logout();
    },
}));
