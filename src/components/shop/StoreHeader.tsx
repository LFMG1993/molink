import {Cart3, Fire, Headset, List, Search, ShieldCheck} from "react-bootstrap-icons";
import {CATEGORIES} from "../../data/product.data.ts";

export const StoreHeader = () => {
    return (
        <>
            <header className="bg-slate-900 sticky top-0 z-50 border-b border-slate-800">
                {/* Top Bar - Micro interactions */}
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
                    {/* Logo */}
                    <a href="#" className="flex-shrink-0 flex items-center gap-2 group">
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                            M
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="font-bold text-xl text-white tracking-tight">molink</span>
                            <span className="text-[10px] text-blue-400 font-medium tracking-widest uppercase">Technology</span>
                        </div>
                    </a>

                    {/* Search Bar - Modern & Integrated */}
                    <div className="flex-1 max-w-2xl relative hidden md:block mx-auto">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Busca software, licencias o marcas..."
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:bg-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all shadow-inner"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-700 rounded text-xs text-slate-400 border border-slate-600 hidden lg:block">
                                Ctrl + K
                            </div>
                        </div>
                    </div>

                    {/* Actions - Clean White/Light Blue */}
                    <div className="flex items-center gap-2 md:gap-6 text-slate-300">
                        {/* Mobile Menu Trigger */}
                        <button className="md:hidden p-2 text-slate-300">
                            <List className="w-6 h-6" />
                        </button>

                        <button className="hidden md:flex flex-col items-center gap-0.5 hover:text-white transition-colors group">
                            <ShieldCheck className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                            <span className="text-[10px] font-medium">Garantía</span>
                        </button>

                        <button className="hidden md:flex flex-col items-center gap-0.5 hover:text-white transition-colors group">
                            <Headset className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                            <span className="text-[10px] font-medium">Ayuda</span>
                        </button>

                        <div className="h-8 w-[1px] bg-slate-700 hidden md:block mx-2"></div>

                        {/* Cart Button */}
                        <button className="relative p-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 rounded-xl transition-all border border-blue-500/30 group">
                            <Cart3 className="w-6 h-6 group-hover:scale-105 transition-transform" />
                            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-blue-900/50 border border-slate-900">2</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Secondary Nav - Clean & Categorical */}
            <div className="bg-white border-b border-slate-100 shadow-sm sticky top-[73px] z-40 hidden md:block">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-8 text-sm font-medium text-slate-600 overflow-x-auto py-3">
                        <div className="flex items-center gap-2 text-blue-600 px-3 py-1 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                            <List className="w-4 h-4" />
                            <span>Todas las categorías</span>
                        </div>
                        {CATEGORIES.map((cat) => (
                            <a key={cat.id} href="#" className="hover:text-blue-600 whitespace-nowrap transition-colors flex items-center gap-2">
                                <cat.icon className="w-4 h-4 opacity-70" />
                                {cat.name}
                            </a>
                        ))}
                        <a href="#" className="ml-auto text-red-500 hover:text-red-600 flex items-center gap-1 font-semibold">
                            <Fire className="w-4 h-4" /> Ofertas Flash
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};