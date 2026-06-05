import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.ts';
import { Spinner } from '../components/shared/Spinner.tsx';

export const AdminGuard = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, isLoading } = useAuthStore();

    if (isLoading) {
        return (
            <div className="admin-os-container flex items-center justify-center min-h-screen w-full" data-theme="cyber">
                <div className="flex flex-col items-center gap-4">
                    <Spinner />
                    <span className="text-[var(--os-text)] font-mono animate-pulse tracking-widest text-sm uppercase">INIT_SYSTEM...</span>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return <>{children}</>;
};