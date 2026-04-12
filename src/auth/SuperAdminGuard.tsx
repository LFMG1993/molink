import { ReactNode } from 'react';

// Placeholder: Aquí va la lógica para verificar si el usuario es un SUPER admin.
export const SuperAdminGuard = ({ children }: { children: ReactNode }) => {
    const isSuperAdmin = true; // TODO: Implementar lógica de roles real

    // Si no es super admin, podrías mostrar un error o redirigir.
    return isSuperAdmin ? <>{children}</> : <div>No tienes permisos suficientes.</div>;
};