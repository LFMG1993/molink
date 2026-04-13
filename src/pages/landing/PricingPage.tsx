import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/shared/SEO.tsx';
import { whatsappNumber } from '../../data/landing/pricing.data.ts';
import { PricingCalculator } from '../../components/landing/PricingCalculator.tsx';
import { PricingSection } from '../../components/landing/PricingSection.tsx';
import { ArrowRight, Globe, Clock, Headset } from 'lucide-react';

const PricingPage = () => {
    const { t, i18n } = useTranslation(); 
    const isEn = i18n.language?.startsWith('en');

    const benefits = [
        {
            Icon: Globe,
            title: isEn ? 'Global Reach' : 'Alcance Global',
            desc: isEn ? 'We work with clients across Latin America, USA, and Europe.' : 'Trabajamos con clientes en Latinoamérica, USA y Europa.',
        },
        {
            Icon: Clock,
            title: isEn ? 'On-Time Delivery' : 'Entrega a Tiempo',
            desc: isEn ? 'We commit to deadlines and keep you informed throughout the process.' : 'Nos comprometemos con fechas y te mantenemos informado durante todo el proceso.',
        },
        {
            Icon: Headset,
            title: isEn ? 'Post-Launch Support' : 'Soporte Post-Lanzamiento',
            desc: isEn ? 'Every package includes free technical support after delivery.' : 'Cada paquete incluye soporte técnico gratuito después de la entrega.',
        },
    ];

    return (
        <>
            <SEO
                title={t('landing.pricing.page_title')}
                description={t('landing.pricing.page_subtitle')}
                keywords="precios desarrollo web, cuánto cuesta una página web, cotización desarrollo, página web Colombia, e-commerce precio"
                canonicalUrl="/pricing"
            />

            {/* Hero */}
            <section className="relative pt-32 pb-20 bg-surface">
                <div className="container mx-auto text-center px-4">
                    <h1 className="font-heading text-4xl md:text-4xl font-bold uppercase text-white title-underline">
                        {t('landing.pricing.page_title')}
                    </h1>
                    <p className="mt-6 text-white/70 max-w-2xl mx-auto text-lg">
                        {t('landing.pricing.page_subtitle')}
                    </p>
                </div>
            </section>

            {/* Main Pricing Section Logic */}
            <PricingSection isFullPage={true} />

            {/* Benefits */}
            <section className="py-20 bg-surface">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {benefits.map(({ Icon, title, desc }, i) => (
                            <div key={i} className="text-center p-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-800 text-accent mb-4">
                                    <Icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                                <p className="text-white/70">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <PricingCalculator />

            {/* CTA */}
            <section className="py-20 bg-surface">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        {t('landing.pricing.cta_section_title')}
                    </h2>
                    <p className="text-white/70 mb-8 max-w-xl mx-auto">
                        {t('landing.pricing.cta_section_desc')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href={`https://wa.me/${whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-accent text-white font-bold uppercase tracking-wider py-3 px-8 rounded-md transition-all duration-300 shadow-lg shadow-[#f30519]/50 hover:bg-red-800 hover:scale-105"
                        >
                            WhatsApp
                            <ArrowRight size={18} />
                        </a>
                        <Link
                            to="/details"
                            className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-bold uppercase tracking-wider py-3 px-8 rounded-md transition-all duration-300 hover:bg-white/20"
                        >
                            {isEn ? 'See Our Services' : 'Ver Servicios'}
                        </Link>
                        <Link
                            to="/faq"
                            className="inline-flex items-center justify-center gap-2 bg-white/5 text-white/70 font-semibold uppercase tracking-wider py-3 px-8 rounded-md transition-all duration-300 hover:bg-white/10 hover:text-white"
                        >
                            {isEn ? 'FAQ' : 'Preguntas Frecuentes'}
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PricingPage;
