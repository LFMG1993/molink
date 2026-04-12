import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO } from '../../components/shared/SEO.tsx';
import { useFadeInOnScroll } from '../../hooks/landing/useFadeInOnScroll.ts';
import { CheckCircle2, Headset, MessageCircle } from 'lucide-react';
import clsx from 'clsx';
const DetailsPage = () => {
    const { t } = useTranslation();
    const [helpBoxRef, helpBoxStyle] = useFadeInOnScroll({ delay: 150 });
    const [navBoxRef, navBoxStyle] = useFadeInOnScroll();
    const location = useLocation();

    const [activeServiceId, setActiveServiceId] = useState('service1');

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (hash && ['service1', 'service2', 'service3', 'service4', 'service5', 'service6'].includes(hash)) {
            setActiveServiceId(hash);
        }
    }, [location.hash]);

    const activeServiceKey = `landing.details.services.${activeServiceId}`;
    const features = t(`${activeServiceKey}.features`, { returnObjects: true, defaultValue: [] }) as Array<{ strong: string; text: string }>;
    const activeService = {
        id: activeServiceId,
        title: t(`${activeServiceKey}.title`),
        intro: t(`${activeServiceKey}.intro`),
        features,
        outro: t(`${activeServiceKey}.outro`, { defaultValue: '' }),
    };

    const serviceIds = ['service1', 'service2', 'service3', 'service4', 'service5', 'service6'];

    return (
        <>
            <SEO
                title={t('landing.details.seo.title')}
                description={t('landing.details.seo.description')}
                keywords={t('landing.details.seo.keywords')}
                canonicalUrl="/details"
            />

            {/* Page Header */}
            <section className="relative pt-32 pb-20 bg-surface">
                <div className="container mx-auto text-center px-4">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white title-underline">{t('landing.details.header.title')}</h1>
                    <p className="mt-6 text-white/70 text-lg max-w-2xl mx-auto">{t('landing.details.header.subtitle')}</p>
                </div>
            </section>

            {/* Service Details Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                        {/* Columna Izquierda: Navegación y Ayuda */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-28 space-y-8">
                                {/* Lista de Servicios */}
                                <div ref={navBoxRef} style={navBoxStyle} className="bg-surface border border-white/10 p-6 rounded-lg">
                                    <h4 className="font-bold text-xl text-white mb-4">{t('landing.details.nav_title')}</h4>
                                    <ul className="space-y-1">
                                        {serviceIds.map(serviceId => (
                                            <li key={serviceId}>
                                                <button
                                                    onClick={() => setActiveServiceId(serviceId)}
                                                    className={clsx(
                                                        'w-full text-left block p-3 rounded-md transition-all duration-300',
                                                        {
                                                            'bg-accent text-white font-semibold shadow-lg shadow-[#f30519]/40': activeServiceId === serviceId,
                                                            'hover:bg-white/10': activeServiceId !== serviceId
                                                        }
                                                    )}
                                                >
                                                    {t(`landing.details.services.${serviceId}.title`)}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Caja de Ayuda */}
                                <div ref={helpBoxRef} style={helpBoxStyle} className="bg-surface border border-white/10 p-6 rounded-lg text-center">
                                    <Headset size={40} className="mx-auto text-accent mb-4"/>
                                    <h4 className="font-bold text-xl text-white mt-3">{t('landing.details.help_box.title')}</h4>
                                    <p className="text-white/70 mt-1">{t('landing.details.help_box.subtitle')}</p>
                                    <a href="https://wa.me/573155756600" target="_blank" rel="noopener noreferrer"
                                       className="inline-flex items-center justify-center gap-2 mt-4 bg-accent text-white font-bold uppercase tracking-wider py-2 px-6 rounded-md transition-all duration-300 shadow-lg shadow-[#f30519]/50 hover:bg-red-800 hover:scale-105">
                                        <MessageCircle size={20} />
                                        <span>WhatsApp</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Columna Derecha: Contenido de los Servicios */}
                        <div className="lg:col-span-8">
                            <div className="space-y-6">
                                <h3 className="font-heading text-3xl font-bold text-white">{activeService.title}</h3>
                                <p className="text-white/80 text-lg">{activeService.intro}</p>
                                <ul className="space-y-4">
                                    {activeService.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <CheckCircle2 size={20} className="text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                                            <span><strong>{feature.strong}</strong>{feature.text}</span>
                                        </li>
                                    ))}
                                </ul>
                                {activeService.outro && (
                                    <p className="text-white/80">{activeService.outro}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DetailsPage;
