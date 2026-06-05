import {LightningFill, ShieldCheck} from "react-bootstrap-icons";
import {Button} from "../../shared/Button.tsx";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../../types";

interface Props {
    mainProduct?: Product;
    onAdd?: (product: Product) => void;
}

export const HeroGrid = ({ mainProduct, onAdd }: Props) => {
    const navigate = useNavigate();

    return (
        <section className="container mx-auto px-4 mt-6 md:mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-100">

                {/* Main Banner */}
                <div className="lg:col-span-8 relative rounded-2xl overflow-hidden bg-slate-900 shadow-xl group">
                    {/* Background Image with Gradient Overlay */}
                    <div className="absolute inset-0">
                        <img
                            src={mainProduct?.imageUrl || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200"}
                            className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                            alt={mainProduct ? mainProduct.name : "Hero"}
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent"></div>
                    </div>

                    <div className="relative h-full flex flex-col justify-center p-8 md:p-12 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold mb-6 w-fit backdrop-blur-sm">
                            <LightningFill className="w-3 h-3 fill-current" /> DESTACADO
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight drop-shadow-lg">
                            {mainProduct ? mainProduct.name : "Potencia Digital"} <br/>
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-400 drop-shadow-md">
                                {mainProduct ? "Premium" : "Sin Límites"}
                            </span>
                        </h1>
                        <div className="flex gap-4">
                            <Button 
                                variant="gradient" 
                                className="px-8 bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg shadow-red-500/30 border-0"
                                onClick={() => {
                                    if (mainProduct && onAdd) onAdd(mainProduct);
                                }}
                            >
                                Comprar ahora
                            </Button>
                            <Button 
                                variant="outline" 
                                className="text-white border-white/20 hover:bg-white/10 hover:text-white hover:border-white transition-all backdrop-blur-sm"
                                onClick={() => {
                                    if (mainProduct) navigate(`/products/${mainProduct.id}`);
                                }}
                            >
                                Ver detalles
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Side Banners (Vertical Stack) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Top Side Banner */}
                    <div className="flex-1 rounded-2xl bg-indigo-900 relative overflow-hidden p-6 flex flex-col justify-center shadow-lg group cursor-pointer">
                        <div className="absolute inset-0 bg-linear-to-br from-indigo-900 to-purple-900"></div>
                        <img src="https://images.unsplash.com/photo-1633419461186-7d40a2e50594?auto=format&fit=crop&q=80&w=500" className="absolute right-0 bottom-0 w-32 opacity-20 rotate-12 group-hover:scale-110 transition-transform" />
                        <div className="relative z-10">
                            <span className="text-indigo-200 text-xs font-bold tracking-wider">OFFICE 2021</span>
                            <h3 className="text-white text-2xl font-bold mt-1 mb-2">Productividad <br/>al Máximo</h3>
                            <span className="inline-block px-3 py-1 bg-white/10 rounded-lg text-white text-sm font-semibold backdrop-blur-md">
                    -45% OFF
                 </span>
                        </div>
                    </div>

                    {/* Bottom Side Banner */}
                    <div className="flex-1 rounded-2xl bg-slate-800 relative overflow-hidden p-6 flex flex-col justify-center shadow-lg group cursor-pointer border border-slate-700">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="relative z-10 flex items-center justify-between">
                            <div>
                                <h3 className="text-white text-xl font-bold mb-1">Pack Seguridad</h3>
                                <p className="text-slate-400 text-sm">VPN + Antivirus</p>
                            </div>
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};