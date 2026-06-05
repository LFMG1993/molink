import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import {
    Fire,
    Headset,
    List,
    Search,
    ShieldCheck,
    X,
} from "react-bootstrap-icons";
import { ImagesHome } from "../../../utils/images.ts";
import { Link } from "react-router-dom";
import LanguageSelector from "../../shared/LanguageSelector.tsx";
import CartDropdown from "../header/CartDropdown";
import { useUserAuth } from "../../../context/store/UserAuthContext.tsx";
import { AuthModal } from "../auth/AuthModal.tsx";

// Eliminado getCategoryIcon ya que las categorías ahora están en StoreCategoriesBar

export const StoreHeader = () => {

    const { isAuthenticated, customer, logout } = useUserAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    // Cierra el menú móvil si el viewport pasa a escritorio (md)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <header className="sticky top-0 z-50 bg-black border-b border-white/10">
                {/* Top Bar */}
                <div
                    className="bg-black text-white/50 text-[11px] py-1.5 hidden md:block border-b border-white/5">
                    <div className="container mx-auto px-4 flex justify-between items-center">
                        <div className="flex gap-4">
                            <span>🚀 Activación garantizada</span>
                            <span>🔒 Pagos 100% seguros</span>
                        </div>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition-colors">Soporte Empresas</a>
                            <a href="#" className="hover:text-white transition-colors">Estado del pedido</a>
                        </div>
                    </div>
                </div>

                {/* Main Header */}
                <div className="container mx-auto px-4 py-4 flex items-center gap-6">
                    {/* Burger — solo móvil */}
                    <button
                        className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
                        onClick={() => setMobileOpen(true)}
                        aria-label="Abrir menú"
                    >
                        <List className="w-6 h-6" />
                    </button>

                    {/* Logo */}
                    <Link to="/" className="flex items-center shrink-0">
                        <img src={ImagesHome.logoWhite} alt="Logo de Molink Tecnologia" className="h-10 w-auto" />
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl relative hidden md:block mx-auto">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Busca software, licencias o marcas..."
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-slate-700 text-slate-100 placeholder:text-white/50 focus:bg-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all shadow-inner"
                            />
                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                            <div
                                className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-700 rounded text-xs text-white/40 border border-slate-600 hidden lg:block">
                                Ctrl + K
                            </div>
                        </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center gap-2 md:gap-4 text-white/70 ml-auto md:ml-0">
                        <LanguageSelector isTransparent={true} />

                        <button
                            className="hidden md:flex flex-col items-center gap-0.5 hover:text-white transition-colors group">
                            <ShieldCheck className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                            <span className="text-[10px] font-medium">Garantía</span>
                        </button>

                        <button
                            className="hidden md:flex flex-col items-center gap-0.5 hover:text-white transition-colors group">
                            <Headset className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                            <span className="text-[10px] font-medium">Ayuda</span>
                        </button>

                        <div className="h-8 w-px bg-slate-700 hidden md:block mx-2"></div>

                        {/* Cart Dropdown */}
                        <CartDropdown isTransparent={true} />
                        {/* Perfil del Usuario */}
                        {isAuthenticated ? (
                            <div className="relative group ml-2">
                                <button className="flex flex-col items-center gap-0.5 hover:text-white transition-colors cursor-pointer group">
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:bg-blue-500 transition-colors">
                                        {customer?.name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                </button>
                                <div className="absolute right-0 top-full mt-2 w-56 bg-white/10 border border-slate-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div className="p-3 border-b border-slate-700">
                                        <p className="text-sm font-semibold text-white truncate">{customer?.name}</p>
                                        <p className="text-xs text-white/40 truncate">{customer?.email}</p>
                                    </div>
                                    <div className="p-2 space-y-1">
                                        <Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700 text-white/70 hover:text-white transition-colors text-sm">
                                            Mi Cuenta
                                        </Link>
                                    </div>
                                    <div className="p-2 border-t border-slate-700">
                                        <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-500 transition-colors text-sm font-medium">
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <button onClick={() => setIsAuthModalOpen(true)} className="hidden md:flex flex-col items-center gap-0.5 hover:text-white transition-colors group ml-2 cursor-pointer">
                                    <div className="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center bg-white/10 group-hover:bg-slate-700 transition-colors">
                                        <User className="w-4 h-4 text-white/40 group-hover:text-blue-400" />
                                    </div>
                                    <span className="text-[10px] font-medium mt-1">Ingresar</span>
                                </button>
                                <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Menú móvil — drawer lateral */}
            {mobileOpen && (
                <div className="fixed inset-0 z-100 md:hidden">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setMobileOpen(false)}
                    />
                    {/* Panel */}
                    <div
                        className="absolute left-0 top-0 h-full w-72 bg-black flex flex-col overflow-y-auto shadow-2xl border-r border-white/10">
                        {/* Header del panel */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <img src={ImagesHome.logoWhite} alt="Logo" className="h-8 w-auto" />
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                                aria-label="Cerrar menú"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Buscador móvil */}
                        <div className="p-4 border-b border-white/10">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="Buscar en la tienda..."
                                    className="w-full bg-white/5 border border-white/10 text-white placeholder-white/40 text-sm rounded-xl pl-11 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white/10 transition-all"
                                />
                                <Search
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                            </div>
                        </div>

                        {/* Categorías (Eliminadas del menú móvil global, movidas a la tienda) */}
                        <nav className="flex-1 p-4">
                            <div className="mt-2 pt-2">
                                <a href="/products?offers=true"
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-sm font-semibold"
                                    onClick={() => setMobileOpen(false)}>
                                    <Fire className="w-4 h-4" /> Ofertas Flash
                                </a>
                            </div>
                        </nav>

                        {/* Footer del panel */}
                        <div className="p-4 border-t border-white/10 space-y-3">
                            <button
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/10 transition-colors text-sm">
                                <ShieldCheck className="w-4 h-4 text-blue-400" />
                                Garantía de activación
                            </button>
                            <button
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/10 transition-colors text-sm">
                                <Headset className="w-4 h-4 text-blue-400" />
                                Centro de ayuda
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

