import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.ts';
import { Spinner } from '../components/shared/Spinner.tsx';

export const AdminGuard = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, isLoading } = useAuthStore();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return <>{children}</>;
};