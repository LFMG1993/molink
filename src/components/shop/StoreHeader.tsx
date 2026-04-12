import {useState, useEffect} from 'react';
import {
    Cart3,
    Fire,
    Headset,
    List,
    Search,
    ShieldCheck,
    X,
    Display,
    Server,
    Lock,
    Motherboard,
    Joystick,
    Palette,
    Globe,
} from "react-bootstrap-icons";
import type {Category} from "../../types";
import {shopService} from "../../services/shopService.ts";
import {ImagesHome} from "../../utils/images.ts";
import {Link} from "react-router-dom";
import LanguageSelector from "../shared/LanguageSelector.tsx";
import {useCart} from "../../context/CardContext.tsx";

// Mapeo dinámico de iconos según el nombre de la categoría
const getCategoryIcon = (name: string): React.ElementType => {
    const lower = name.toLowerCase();
    if (lower.includes('sistema') || lower.includes('windows') || lower.includes('mac') || lower.includes('os')) return Display;
    if (lower.includes('office') || lower.includes('ofimatica') || lower.includes('productividad') || lower.includes('suite')) return Server;
    if (lower.includes('seguridad') || lower.includes('antivirus')) return ShieldCheck;
    if (lower.includes('vpn') || lower.includes('privacidad')) return Globe;
    if (lower.includes('diseño') || lower.includes('creativ') || lower.includes('adobe')) return Palette;
    if (lower.includes('gaming') || lower.includes('juego') || lower.includes('game')) return Joystick;
    if (lower.includes('hardware') || lower.includes('componente')) return Motherboard;
    return Lock; // default
};

export const StoreHeader = () => {
    const {items} = useCart();
    const [categories, setCategories] = useState<Category[]>([]);
    const [mobileOpen, setMobileOpen] = useState(false);

    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        shopService.getPublicCategories()
            .then(setCategories)
            .catch(() => {
                // Silently fail — el menú quedará vacío
            });
    }, []);

    return (
        <>
            <header className="bg-slate-900 sticky top-0 z-50 border-b border-slate-800">
                {/* Top Bar */}
                <div className="bg-slate-950 text-slate-400 text-[11px] py-1.5 hidden md:block border-b border-slate-800/50">
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
                        className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
                        onClick={() => setMobileOpen(true)}
                        aria-label="Abrir menú"
                    >
                        <List className="w-6 h-6"/>
                    </button>

                    {/* Logo */}
                    <Link to="/" className="flex items-center flex-shrink-0">
                        <img src={ImagesHome.logoWhite} alt="Logo de Molink Tecnologia" className="h-10 w-auto"/>
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl relative hidden md:block mx-auto">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Busca software, licencias o marcas..."
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:bg-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all shadow-inner"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-blue-500 transition-colors"/>
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-700 rounded text-xs text-slate-400 border border-slate-600 hidden lg:block">
                                Ctrl + K
                            </div>
                        </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center gap-2 md:gap-4 text-slate-300 ml-auto md:ml-0">
                        <LanguageSelector isTransparent={true}/>

                        <button className="hidden md:flex flex-col items-center gap-0.5 hover:text-white transition-colors group">
                            <ShieldCheck className="w-5 h-5 group-hover:text-blue-400 transition-colors"/>
                            <span className="text-[10px] font-medium">Garantía</span>
                        </button>

                        <button className="hidden md:flex flex-col items-center gap-0.5 hover:text-white transition-colors group">
                            <Headset className="w-5 h-5 group-hover:text-blue-400 transition-colors"/>
                            <span className="text-[10px] font-medium">Ayuda</span>
                        </button>

                        <div className="h-8 w-[1px] bg-slate-700 hidden md:block mx-2"></div>

                        {/* Botón carrito */}
                        <button className="relative p-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 rounded-xl transition-all border border-blue-500/30 group">
                            <Cart3 className="w-6 h-6 group-hover:scale-105 transition-transform"/>
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-blue-900/50 border border-slate-900">
                                    {cartCount > 99 ? '99+' : cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Barra de categorías — solo escritorio */}
            <div className="bg-white border-b border-slate-100 shadow-sm sticky top-[73px] z-40 hidden md:block">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-8 text-sm font-medium text-slate-600 overflow-x-auto py-3">
                        <div className="flex items-center gap-2 text-blue-600 px-3 py-1 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors flex-shrink-0">
                            <List className="w-4 h-4"/>
                            <span>Todas las categorías</span>
                        </div>
                        {categories.map((cat) => {
                            const CatIcon = getCategoryIcon(cat.name);
                            return (
                                <a key={cat.id} href="#"
                                   className="hover:text-blue-600 whitespace-nowrap transition-colors flex items-center gap-2 flex-shrink-0">
                                    <CatIcon className="w-4 h-4 opacity-70"/>
                                    {cat.name}
                                </a>
                            );
                        })}
                        <a href="#" className="ml-auto text-red-500 hover:text-red-600 flex items-center gap-1 font-semibold flex-shrink-0">
                            <Fire className="w-4 h-4"/> Ofertas Flash
                        </a>
                    </div>
                </div>
            </div>

            {/* Menú móvil — drawer lateral */}
            {mobileOpen && (
                <div className="fixed inset-0 z-[100] md:hidden">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setMobileOpen(false)}
                    />
                    {/* Panel */}
                    <div className="absolute left-0 top-0 h-full w-72 bg-slate-900 flex flex-col overflow-y-auto shadow-2xl">
                        {/* Header del panel */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-800">
                            <img src={ImagesHome.logoWhite} alt="Logo" className="h-8 w-auto"/>
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800"
                                aria-label="Cerrar menú"
                            >
                                <X className="w-5 h-5"/>
                            </button>
                        </div>

                        {/* Buscador móvil */}
                        <div className="p-4 border-b border-slate-800">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4"/>
                            </div>
                        </div>

                        {/* Categorías */}
                        <nav className="flex-1 p-4">
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-3 px-1">
                                Categorías
                            </p>
                            <ul className="space-y-1">
                                <li>
                                    <a href="#"
                                       className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-blue-400 bg-blue-600/10 hover:bg-blue-600/20 transition-colors text-sm font-medium"
                                       onClick={() => setMobileOpen(false)}>
                                        <List className="w-4 h-4"/>
                                        Todas las categorías
                                    </a>
                                </li>
                                {categories.map((cat) => {
                                    const CatIcon = getCategoryIcon(cat.name);
                                    return (
                                        <li key={cat.id}>
                                            <a
                                                href="#"
                                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-sm"
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                <CatIcon className="w-4 h-4 opacity-60"/>
                                                {cat.name}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>

                            {/* Ofertas Flash separadas */}
                            <div className="mt-6 pt-4 border-t border-slate-800">
                                <a href="#"
                                   className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-sm font-semibold"
                                   onClick={() => setMobileOpen(false)}>
                                    <Fire className="w-4 h-4"/> Ofertas Flash
                                </a>
                            </div>
                        </nav>

                        {/* Footer del panel */}
                        <div className="p-4 border-t border-slate-800 space-y-3">
                            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors text-sm">
                                <ShieldCheck className="w-4 h-4 text-blue-400"/>
                                Garantía de activación
                            </button>
                            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors text-sm">
                                <Headset className="w-4 h-4 text-blue-400"/>
                                Centro de ayuda
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

