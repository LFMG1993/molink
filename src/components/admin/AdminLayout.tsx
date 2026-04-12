import { Outlet } from 'react-router-dom';
import Dock from './Dock';

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-[var(--color-background)] pb-24">
            <main className="container mx-auto p-8">
                <Outlet />
            </main>
            <Dock />
        </div>
    );
};

export default AdminLayout;