import type {ReactNode} from 'react';

export const SuperAdminGuard = ({children}: { children: ReactNode }) => {
    const isSuperAdmin = true;

    return isSuperAdmin ? <>{children}</> : <div>No tienes permisos suficientes.</div>;
};