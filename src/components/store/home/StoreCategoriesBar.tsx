import { useState, useEffect, useRef } from "react";
import { List, Flame, Monitor, Server, Lock, Cpu, Gamepad2, Palette, Globe, ShieldCheck } from "lucide-react";
import { shopService } from "../../../services/store/shopService.ts";
import type { Category } from "../../../types";

// Mapeo dinámico de iconos según el nombre de la categoría
const getCategoryIcon = (name: string): React.ElementType => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('antivirus') || lowerName.includes('antivirus')) return ShieldCheck;
    if (lowerName.includes('monitor') || lowerName.includes('pantalla')) return Monitor;
    if (lowerName.includes('software') || lowerName.includes('software')) return Server;
    if (lowerName.includes('seguridad') || lowerName.includes('cctv')) return Lock;
    if (lowerName.includes('microsoft') || lowerName.includes('microsoft')) return Cpu;
    if (lowerName.includes('gamer') || lowerName.includes('juego')) return Gamepad2;
    if (lowerName.includes('diseño') || lowerName.includes('arte')) return Palette;
    return Globe;
};

export const StoreCategoriesBar = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        shopService.getPublicCategories()
            .then(res => setCategories(res))
            .catch(err => console.error("Error loading categories:", err));
    }, []);

    // Cerrar dropdown al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (categories.length === 0) return null;

    return (
        <div className="bg-white border-b border-slate-100 hidden md:block">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-8 text-sm font-medium text-slate-600 overflow-x-auto py-3">
                    <div className="relative shrink-0" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 text-blue-600 px-3 py-1.5 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                        >
                            <List className="w-4 h-4" />
                            <span>Todas las categorías</span>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
                                {categories.map(cat => {
                                    const CatIcon = getCategoryIcon(cat.name);
                                    return (
                                        <a
                                            key={cat.id}
                                            href={`/products?category=${cat.id}`}
                                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                                        >
                                            <CatIcon className="w-4 h-4 text-slate-400" />
                                            {cat.name}
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    {categories.map((cat) => {
                        const CatIcon = getCategoryIcon(cat.name);
                        return (
                            <a key={cat.id} href={`/products?category=${cat.id}`}
                                className="hover:text-blue-600 whitespace-nowrap transition-colors flex items-center gap-2 shrink-0">
                                <CatIcon className="w-4 h-4 opacity-70" />
                                {cat.name}
                            </a>
                        );
                    })}
                    <a href="/products?offers=true"
                        className="ml-auto text-red-500 hover:text-red-600 flex items-center gap-1.5 font-semibold shrink-0">
                        <Flame className="w-4 h-4" /> Ofertas Flash
                    </a>
                </div>
            </div>
        </div>
    );
};
