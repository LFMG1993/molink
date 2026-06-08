import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO } from '../../components/shared/SEO.tsx';
import Carousel from '../../components/landing/Carousel.tsx';
import { PricingSection } from '../../components/landing/PricingSection.tsx';
import { ImagesHome, ImagesClients } from "../../utils/images.ts";
import {
    Code2, Smartphone, Layout, Cpu, ShoppingBag,
    FileCode, TextCursorInput, Search,
    Palette, Code, Rocket, CircleHelp
} from 'lucide-react';

const HomePage = () => {
    const { t } = useTranslation();
    const isLocal = import.meta.env.DEV;
    const tiendaUrl = isLocal ? 'http://tienda.localhost:5173' : 'https://tienda.molink.com.co';
    const services = [
        {
            IconComponent: Code2,
            title: t('landing.services.items.web_pages.title'),
            description: t('landing.services.items.web_pages.description'),
        },
        {
            IconComponent: Smartphone,
            title: t('landing.services.items.mobile.title'),
            description: t('landing.services.items.mobile.description'),
        },
        {
            IconComponent: Layout,
            title: t('landing.services.items.uiux.title'),
            description: t('landing.services.items.uiux.description'),
        },
        {
            IconComponent: Cpu,
            title: t('landing.services.items.hardware.title'),
            description: t('landing.services.items.hardware.description'),
        },
        {
            IconComponent: ShoppingBag,
            title: t('landing.services.items.software.title'),
            description: t('landing.services.items.software.description'),
        },
    ];

    // Hook para manejar la cantidad de slides a mostrar de forma responsiva
    const [slidesToShow, setSlidesToShow] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setSlidesToShow(4);
            } else if (window.innerWidth >= 1024) {
                setSlidesToShow(3);
            } else if (window.innerWidth >= 768) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(1);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Llamar una vez al inicio

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <>
            <SEO
                title={t('landing.seo.home.title')}
                description={t('landing.seo.home.description')}
                keywords={t('landing.seo.home.keywords')}
                canonicalUrl="/"
            />

            {/* Hero Section */}
            <section id="start" className="relative w-full min-h-screen flex items-center justify-center text-white">
                <div className="absolute inset-0 z-0">
                    <picture>
                        <source media="(max-width: 768px)" srcSet={ImagesHome.fondoCodigoMobile} />
                        <source media="(max-width: 1280px)" srcSet={ImagesHome.fondoCodigoTablet} />
                        <img src={ImagesHome.fondoCodigo} alt="Fondo de la ciudad de Cúcuta"
                            className="w-full h-full object-cover" />
                    </picture>
                    <div className="absolute inset-0 bg-black/70"></div>
                </div>
                <div className="relative z-10 container mx-auto text-center px-8 py-32 md:py-0">
                    <div className="max-w-5xl mx-auto">
                        <h1 className="font-nav font-bold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight">{t('landing.hero.title')}</h1>
                        <p className="mt-6 text-lg sm:text-xl text-white/90 font-light">
                            {t('landing.hero.subtitle')}
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link to="/details#service2"
                            className="group flex flex-col items-center justify-center p-6 border border-white/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#f30519]/40 transition-all duration-300 h-full">
                            <FileCode size={40} className="text-accent" />
                            <h2 className="font-bold mt-3 text-lg text-white/80 group-hover:text-accent transition-colors">
                                {t('landing.hero.web_dev')}</h2>
                        </Link>
                        <Link to="/details#service3"
                            className="group flex flex-col items-center justify-center p-6 border border-white/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#f30519]/40 transition-all duration-300 h-full">
                            <Smartphone size={40} className="text-accent" />
                            <h2 className="font-bold mt-3 text-lg text-white/80 group-hover:text-accent transition-colors">
                                {t('landing.hero.mobile_dev')}</h2>
                        </Link>
                        <Link to="/details#service4"
                            className="group flex flex-col items-center justify-center p-6 border border-white/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#f30519]/40 transition-all duration-300 h-full">
                            <TextCursorInput size={40} className="text-accent" />
                            <h2 className="font-bold mt-3 text-lg text-white/80 group-hover:text-accent transition-colors">
                                {t('landing.hero.admin')}</h2>
                        </Link>
                        <a href={tiendaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center justify-center p-6 border border-white/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#f30519]/40 transition-all duration-300 h-full">
                            <ShoppingBag size={40} className="text-accent" />
                            <h2 className="font-bold mt-3 text-lg text-white/80 group-hover:text-accent transition-colors">
                                {t('landing.hero.software')}</h2>
                        </a>
                    </div>
                </div>
            </section>

            <hr className="container mx-auto border-t border-white/30 my-16" />

            {/* Services Section */}
            <section id="services" className="py-16 bg-black text-white">
                <div className="container mx-auto px-4 md:px-16">
                    <div className="mb-12">
                        <h2 className="font-heading text-4xl font-bold uppercase text-white mt-2 title-underline">{t('landing.services.title')}</h2>
                    </div>
                    <div className="w-full">
                        <Carousel slidesToShow={slidesToShow}>
                            {services.map(({ IconComponent, title, description }, index) => (
                                <div key={index}
                                    className="bg-surface p-8 text-center border border-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-[#f30519]/40 hover:-translate-y-2 flex flex-col justify-center items-center rounded-lg h-[380px] sm:h-[360px] md:h-[400px] lg:h-[380px] xl:h-[400px]">
                                    <div
                                        className="mx-auto mb-5 flex h-20 w-20 shrink-0 items-center justify-center rounded-md bg-white/70 text-red-800 border border-red-800/80">
                                        <IconComponent size={40} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-white min-h-14 flex items-center justify-center leading-tight line-clamp-2">{title}</h3>
                                    <p className="text-white/90 text-base leading-relaxed line-clamp-3">{description}</p>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </section>

            <hr className="container mx-auto border-t border-white/30 my-16" />

            {/* Process Section */}
            <section id="process" className="py-16 bg-surface text-white">
                <div className="container mx-auto px-4">
                    <div className="text-end mb-16">
                        <h2 className="font-heading text-4xl font-bold uppercase text-white mt-2 title-underline">{t('landing.process.title')}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div
                            className="relative p-8 border border-white/10 text-center hover:shadow-lg hover:shadow-[#f30519]/40 hover:-translate-y-3">
                            <div className="absolute top-4 right-4 font-heading text-6xl text-red-800">01</div>
                            <div className="mb-4 text-accent"><Search size={40} className="mx-auto" /></div>
                            <h3 className="text-xl font-bold mb-2 text-white">{t('landing.process.steps.analysis.title')}</h3>
                            <p className="text-white/90">{t('landing.process.steps.analysis.description')}</p>
                        </div>
                        <div
                            className="relative p-8 border border-white/10 text-center hover:shadow-lg hover:shadow-[#f30519]/40 hover:-translate-y-3">
                            <div className="absolute top-4 right-4 font-heading text-6xl text-red-800">02</div>
                            <div className="mb-4 text-accent"><Palette size={40} className="mx-auto" /></div>
                            <h3 className="text-xl font-bold mb-2 text-white">{t('landing.process.steps.design.title')}</h3>
                            <p className="text-white/90">{t('landing.process.steps.design.description')}</p>
                        </div>
                        <div
                            className="relative p-8 border border-white/10 text-center hover:shadow-lg hover:shadow-[#f30519]/40 hover:-translate-y-3">
                            <div className="absolute top-4 right-4 font-heading text-6xl text-red-800">03</div>
                            <div className="mb-4 text-accent"><Code size={40} className="mx-auto" /></div>
                            <h3 className="text-xl font-bold mb-2 text-white">{t('landing.process.steps.development.title')}</h3>
                            <p className="text-white/90">{t('landing.process.steps.development.description')}</p>
                        </div>
                        <div
                            className="relative p-8 border border-white/10 text-center hover:shadow-lg hover:shadow-[#f30519]/40 hover:-translate-y-3">
                            <div className="absolute top-4 right-4 font-heading text-6xl text-red-800">04</div>
                            <div className="mb-4 text-accent"><Rocket size={40} className="mx-auto" /></div>
                            <h3 className="text-xl font-bold mb-2 text-white">{t('landing.process.steps.launch.title')}</h3>
                            <p className="text-white/90">{t('landing.process.steps.launch.description')}</p>
                        </div>
                    </div>
                </div>
            </section>
            <hr className="container mx-auto border-t border-white/30" />

            {/* Pricing Section */}
            <section id={"pricing"}>
                <PricingSection />
            </section>

            <hr className="container mx-auto border-t border-white/30" />

            {/* FAQ Teaser Section */}
            <section className="py-16 bg-black text-white">
                <div className="container mx-auto px-4 text-center">
                    <div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-800/30 text-accent mb-6">
                        <CircleHelp size={40} />
                    </div>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-white mb-4 title-underline">
                        {t('landing.faq.hero_title')}
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-white/70 text-lg">
                        {t('landing.faq.hero_subtitle')}
                    </p>
                    <Link to="/faq"
                        className="inline-flex items-center justify-center gap-2 bg-accent text-white font-bold uppercase tracking-wider py-3 px-8 mt-8 rounded-lg transition-all duration-300 shadow-lg shadow-[#f30519]/50 hover:bg-red-800 hover:scale-105">
                        {t('landing.nav.faq')}
                    </Link>
                </div>
            </section>

            <hr className="container mx-auto border-t border-white/30" />
            {/* Portfolio Section */}
            <section id="portfolio" className="py-16 bg-surface">
                <div className="container mx-auto px-4">
                    <div className="relative z-10 container mx-auto text-center px-4 my-8">
                        <h2 className="font-heading text-4xl font-bold uppercase text-white title-underline">{t('landing.portfolio.title')}</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-white/80 text-lg">
                            {t('landing.portfolio.description')}
                        </p>
                        <Link to="/portfolio"
                            className="inline-block mt-8 bg-accent text-white font-bold uppercase tracking-wider py-3 px-8 rounded-md transition-all duration-300 shadow-lg shadow-[#f30519]/50 hover:bg-red-800 hover:scale-105">
                            {t('landing.portfolio.cta')}
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-12 items-center">
                        <div className="flex justify-center items-center p-4">
                            <img src={ImagesClients.liderplast} alt="Logo del cliente Liderplast"
                                className="h-16 w-full object-contain grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-110" />
                        </div>
                        <div className="flex justify-center items-center p-4">
                            <img src={ImagesClients.sena2023} alt="Logo del cliente Sena 2023"
                                className="h-16 w-full object-contain grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-110" />
                        </div>
                        <div className="flex justify-center items-center p-4">
                            <img src={ImagesClients.encontrable} alt="Logo del cliente Encontrable"
                                className="h-16 w-full object-contain grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-110" />
                        </div>
                        <div className="flex justify-center items-center p-4">
                            <img src={ImagesClients.powerTeam} alt="Logo del cliente Power Team"
                                className="h-16 w-full object-contain grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-110" />
                        </div>
                        <div className="flex justify-center items-center p-4">
                            <img src={ImagesClients.advise} alt="Logo del cliente Advise"
                                className="h-16 w-full object-contain grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-110" />
                        </div>
                        <div className="flex justify-center items-center p-4">
                            <img src={ImagesClients.gallinasCasa} alt="Logo del cliente Gallinas de Casa"
                                className="h-16 w-full object-contain grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-110" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
