export const StoreFooter = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-white font-bold text-2xl">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-lg">M</div>
                            molink
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Transformamos la manera en que adquieres software. Licencias originales, precios justos y soporte técnico de verdad.
                        </p>
                        <div className="flex gap-4 pt-2">
                            {/* Social Placeholders */}
                            <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 transition-colors cursor-pointer"></div>
                            <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 transition-colors cursor-pointer"></div>
                            <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 transition-colors cursor-pointer"></div>
                        </div>
                    </div>

                    <div>
                        <h5 className="text-white font-semibold mb-6">Categorías</h5>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Sistemas Operativos</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Office & Productividad</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Antivirus & Seguridad</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Diseño & Creatividad</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-white font-semibold mb-6">Soporte</h5>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Centro de Ayuda</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Cómo comprar</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Estado del pedido</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Contacto directo</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-white font-semibold mb-6">Boletín</h5>
                        <p className="text-xs text-slate-400 mb-4">Recibe ofertas exclusivas y cupones de descuento.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Tu correo electrónico"
                                className="bg-slate-800 border-none rounded-l-lg px-4 py-2 text-sm w-full focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg text-sm font-medium transition-colors">
                                Suscribir
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>© 2024 Molink Tecnología S.A.S. Todos los derechos reservados.</p>
                    <div className="flex items-center gap-4">
                        <span>Términos y Condiciones</span>
                        <span>Política de Privacidad</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};