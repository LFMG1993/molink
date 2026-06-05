import {useEffect, type ReactNode} from 'react';
import {useCustomerAuthStore} from '../../store/customerAuthStore.ts';
export type {Customer} from '../../types/auth.types.ts';

/**
 * Hook de conveniencia. Delega al store de Zustand.
 */
export const useUserAuth = () => useCustomerAuthStore();

export const UserAuthProvider = ({children}: {children: ReactNode}) => {
    const initialize = useCustomerAuthStore((s) => s.initialize);
    useEffect(() => {initialize();}, [initialize]);
    return <>{children}</>;
};
