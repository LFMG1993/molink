import {
    Headset,
    Server,
    ChevronRight,
    CreditCard,
    CheckCircleFill,
    Download
} from 'react-bootstrap-icons';
import {MOCK_PRODUCTS} from "../../data/product.data.ts";
import {StoreHeader} from "../../components/shop/StoreHeader.tsx";
import {StoreFooter} from "../../components/shop/StoreFooter.tsx";
import {HeroGrid} from "../../components/shop/HeroGrid.tsx";
import {ProductCard} from "../../components/shop/ProductCard.tsx";
import {Button} from "../../components/shop/Button.tsx";

const FeaturesRow = () => {
    return (
        <section className="container mx-auto px-4 py-12 border-b border-slate-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex gap-4 items-start">
                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                        <Download className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">Entrega Digital</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">Licencias enviadas a tu email en segundos.</p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                        <CheckCircleFill className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">Software Original</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">Garantía de activación vitalicia.</p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                        <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">Pagos Seguros</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">Procesados con encriptación SSL.</p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                        <Headset className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">Soporte Experto</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">Te ayudamos con la instalación.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

const SectionHeading = ({ title, subtitle, action }: { title: string, subtitle?: string, action?: string }) => (
    <div className="flex items-end justify-between mb-6 px-1">
        <div>
            <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
            {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
        </div>
        {action && (
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                {action} <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
        )}
    </div>
);

const StorePage = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
            <StoreHeader />
            <main className="pb-20 space-y-16">
                <HeroGrid />
                <FeaturesRow />
                <section className="container mx-auto px-4">
                    <SectionHeading
                        title="Lo más vendido"
                        subtitle="El software preferido por profesionales y empresas"
                        action="Ver todo el catálogo"
                    />
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {MOCK_PRODUCTS.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
                <section className="container mx-auto px-4">
                    <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-blue-900/20">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                        <div className="relative z-10 text-white max-w-lg">
                            <h3 className="text-3xl font-bold mb-3">¿Eres una empresa?</h3>
                            <p className="text-blue-100 text-lg mb-6">Cotiza licencias por volumen con precios mayoristas y factura legal electrónica.</p>
                            <Button variant="outline" className="bg-white text-blue-600 border-transparent hover:bg-blue-50 border-0">
                                Contactar Asesor Corporativo
                            </Button>
                        </div>
                        <div className="relative z-10 hidden md:block">
                            <Server className="w-40 h-40 text-white/20" />
                        </div>
                    </div>
                </section>
                <section className="container mx-auto px-4">
                    <SectionHeading
                        title="Novedades Recientes"
                        action="Ver novedades"
                    />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {MOCK_PRODUCTS.slice(0, 4).map((product) => (
                            <ProductCard key={`new-${product.id}`} product={{...product, tags: ['new']}} />
                        ))}
                    </div>
                </section>
            </main>
            <StoreFooter />
        </div>
    );
}

export default StorePage;