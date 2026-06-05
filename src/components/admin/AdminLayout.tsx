import React, { useState } from 'react';
import { Terminal, PaintBucket, LogOut, Monitor } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Windows98Provider, useWindows98 } from '../../context/admin/Windows98Context';
import { dockItems } from '../../models/store/navigations';
import DashboardPage from '../../pages/admin/DashboardPage';
import UsersPage from '../../pages/admin/UsersPage';
import ProductsPage from '../../pages/admin/ProductsPage';
import CategoriesPage from '../../pages/admin/CategoriesPage';
import AttributesPage from '../../pages/admin/AttributesPage';
import InventoryPage from '../../pages/admin/InventoryPage';
import ProvidersPage from '../../pages/admin/ProvidersPage';
import OrdersPage from '../../pages/admin/OrdersPage';
import ShipmentsPage from '../../pages/admin/ShipmentPage';
import PaymentMethodsPage from '../../pages/admin/PaymentMethodsPage';
import EmprendePage from '../../pages/admin/EmprendePage';
import { SuperAdminGuard } from '../../auth/SuperAdminGuard';
import '../../style/admin-os.css';

const Desktop: React.FC = () => {
    const { windows, openApps, toggleMinimize, openApp } = useWindows98();
    const { logout } = useAuthStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [theme, setTheme] = useState<'cyber' | 'blueprint'>('cyber');

    const handleOpenApp = (appId: string) => {
        openApp(appId);
        setIsMenuOpen(false);
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'cyber' ? 'blueprint' : 'cyber');
    };

    const showDesktop = () => {
        // Minimiza todas las ventanas
        windows.forEach(w => {
            if (!w.isMinimized) {
                toggleMinimize(w.id);
            }
        });
    };

    return (
        <div data-theme={theme} className="admin-os-container relative w-full h-screen overflow-hidden">
            {/* Escritorio base */}
            <DashboardPage />

            {/* Renderizador de Aplicaciones */}
            {openApps.includes('users') && <SuperAdminGuard><UsersPage /></SuperAdminGuard>}
            {openApps.includes('products') && <ProductsPage />}
            {openApps.includes('categories') && <CategoriesPage />}
            {openApps.includes('attributes') && <AttributesPage />}
            {openApps.includes('inventory') && <InventoryPage />}
            {openApps.includes('providers') && <ProvidersPage />}
            {openApps.includes('orders') && <OrdersPage />}
            {openApps.includes('shipments') && <ShipmentsPage />}
            {openApps.includes('payment-methods') && <PaymentMethodsPage />}
            {openApps.includes('emprende') && <EmprendePage />}

            <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-[var(--os-taskbar-bg)] border-t border-[var(--os-taskbar-border)] flex items-center px-2 z-[100] text-[var(--os-text)] backdrop-blur-md">

                {/* Menú de Inicio */}
                {isMenuOpen && (
                    <div className="absolute bottom-[45px] left-2 w-56 bg-[var(--os-window-bg)] border border-[var(--os-window-border)] shadow-[var(--os-window-shadow)] flex flex-col text-[var(--os-text)] backdrop-blur-md rounded-sm overflow-hidden admin-os-window">
                        <div className="flex items-center gap-2 px-4 py-3 bg-[var(--os-window-title-bg)] border-b border-[var(--os-window-border)]">
                            <Terminal className="w-5 h-5 text-[var(--os-accent)]" />
                            <span className="font-bold tracking-widest text-[var(--os-text)]">MOLINK</span>
                        </div>
                        <div className="flex-1 py-2">
                            {dockItems.map((item) => {
                                if (item.appId === 'dashboard') return null;
                                return (
                                    <button key={item.name} onClick={() => handleOpenApp(item.appId)} className="w-full text-left px-4 py-2 hover:bg-[var(--os-accent)] hover:text-[var(--os-bg)] flex items-center gap-3 text-sm transition-colors duration-150">
                                        <item.icon className="w-4 h-4" />
                                        <span className="font-medium tracking-wide">{item.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                        <div className="border-t border-[var(--os-window-border)] bg-black/20 p-2 flex flex-col gap-1">
                            <button
                                onClick={() => {
                                    showDesktop();
                                    setIsMenuOpen(false);
                                }}
                                className="w-full text-left px-2 py-1.5 hover:bg-[var(--os-window-title-bg)] flex items-center gap-3 text-sm transition-colors duration-150 text-gray-300 hover:text-white rounded-sm"
                            >
                                <Monitor className="w-4 h-4" />
                                <span>Inicio</span>
                            </button>
                            <button
                                onClick={logout}
                                className="w-full text-left px-2 py-1.5 hover:bg-red-500/20 flex items-center gap-3 text-sm transition-colors duration-150 text-red-400 hover:text-red-500 rounded-sm"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Cerrar Sesión</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Botón de Inicio */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`flex items-center gap-2 px-3 py-1 font-bold text-sm border border-[var(--os-taskbar-border)] transition-all duration-200 ${isMenuOpen ? 'bg-[var(--os-accent)] text-[var(--os-bg)] shadow-[0_0_10px_var(--os-accent)]' : 'bg-transparent text-[var(--os-text)] hover:bg-[var(--os-window-title-bg)]'}`}
                >
                    <Terminal className="w-4 h-4" />
                    Inicio
                </button>

                {/* "Ventanas Abiertas" en la barra de tareas */}
                <div className="flex-1 flex px-3 gap-2 overflow-x-hidden ml-2 pl-3 border-l border-[var(--os-taskbar-border)] opacity-70">
                    {windows.map((win) => (
                        <div
                            key={win.id}
                            onClick={() => toggleMinimize(win.id)}
                            className={`flex items-center px-3 py-1 min-w-[120px] max-w-[180px] text-xs font-medium gap-2 truncate cursor-pointer border border-[var(--os-taskbar-border)] transition-all duration-200 ${win.isMinimized ? 'bg-transparent opacity-60 hover:opacity-100 hover:bg-[var(--os-window-title-bg)]' : 'bg-[var(--os-window-title-bg)] shadow-[inset_0_0_8px_var(--os-window-title-bg)]'}`}
                        >
                            {win.title}
                        </div>
                    ))}
                </div>

                {/* Theme Switcher */}
                <button onClick={toggleTheme} className="mr-3 px-2 py-1 flex items-center gap-2 hover:bg-[var(--os-window-title-bg)] border border-transparent hover:border-[var(--os-taskbar-border)] transition-all" title="Toggle Theme">
                    <PaintBucket className="w-4 h-4" />
                </button>

                {/* Reloj de la barra de tareas */}
                <div className="px-3 py-1 text-xs font-mono tracking-widest border border-[var(--os-taskbar-border)] bg-[var(--os-window-title-bg)] flex items-center">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>

            {/* Si clicas fuera del menú, que se cierre */}
            {isMenuOpen && (
                <div className="absolute inset-0 z-[90]" onClick={() => setIsMenuOpen(false)}></div>
            )}
        </div>
    );
};

const AdminLayout = () => {
    return (
        <Windows98Provider>
            <Desktop />
        </Windows98Provider>
    );
};

export default AdminLayout;