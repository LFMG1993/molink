import {LightningFill, ShieldCheck} from "react-bootstrap-icons";
import {Button} from "../../shared/Button.tsx";

export const HeroGrid = () => {
    return (
        <section className="container mx-auto px-4 mt-6 md:mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-100">

                {/* Main Banner */}
                <div className="lg:col-span-8 relative rounded-2xl overflow-hidden bg-slate-900 shadow-xl group">
                    {/* Background Image with Gradient Overlay */}
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200"
                            className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                            alt="Hero"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900/80 to-transparent"></div>
                    </div>

                    <div className="relative h-full flex flex-col justify-center p-8 md:p-12 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold mb-6 w-fit backdrop-blur-sm">
                            <LightningFill className="w-3 h-3 fill-current" /> NUEVO LANZAMIENTO
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                            Potencia Digital <br/>
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">Sin Límites</span>
                        </h1>
                        <p className="text-slate-300 mb-8 text-lg max-w-md">
                            Actualiza a Windows 11 Pro y obtén las herramientas de IA más avanzadas para tu equipo.
                        </p>
                        <div className="flex gap-4">
                            <Button variant="gradient" className="px-8">Comprar ahora</Button>
                            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 hover:text-white hover:border-white">Ver detalles</Button>
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