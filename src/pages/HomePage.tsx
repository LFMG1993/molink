import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {SEO} from '../components/general/SEO.tsx';
import Carousel from '../components/general/Carousel.tsx';
import {ImagesHome, ImagesClients} from "../utils/images.ts";
import {
    FileEarmarkCode,
    PhoneVibrate,
    Fullscreen,
    Motherboard,
    DiscFill,
    FiletypeHtml,
    Phone,
    BodyText,
    Disc,
    Search,
    Palette,
    CodeSlash,
    RocketTakeoff
} from 'react-bootstrap-icons';


const HomePage = () => {
    const services = [
        {
            IconComponent: FileEarmarkCode,
            title: 'Páginas de Presentación',
            description: 'Máximo rendimiento para tu sitio web: Mantenimiento, seguridad y optimización.',
        },
        {
            IconComponent: PhoneVibrate,
            title: 'Desarrollo Móvil',
            description: 'Soluciones que se ajustan a las necesidades actuales del mercado, creando o complementando tu negocio.',
        },
        {
            IconComponent: Fullscreen,
            title: 'Diseño UI/UX',
            description: 'Creamos productos digitales que lucen bien, son fáciles de usar y brindan una experiencia positiva.',
        },
        {
            IconComponent: Motherboard,
            title: 'Hardware',
            description: 'Venta de repuestos, cámaras de vigilancia, domótica y mucho más para potenciar tu infraestructura.',
        },
        {
            IconComponent: DiscFill,
            title: 'Software',
            description: 'Adquiere licencias originales de los software más solicitados en el mercado para tu empresa.',
        },
    ];

    // Hook para manejar la cantidad de slides a mostrar de forma responsiva
    const [slidesToShow, setSlidesToShow] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) { // xl
                setSlidesToShow(4);
            } else if (window.innerWidth >= 1024) { // lg
                setSlidesToShow(3);
            } else if (window.innerWidth >= 768) { // md
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
                title="Desarrollo Web y Móvil en Cúcuta"
                description="Soluciones tecnológicas a medida. Ofrecemos desarrollo de páginas web, aplicaciones móviles, administración de sitios y SEO para impulsar tu negocio."
                keywords="desarrollo web, desarrollo movil, paginas web, programador, Cúcuta, Colombia, Molink, tecnologia"
                canonicalUrl="/"
            />

            {/* Hero Section */}
            <section id="start" className="relative w-full min-h-screen flex items-center justify-center text-white">
                <div className="absolute inset-0 z-0">
                    <picture>
                        <source media="(max-width: 768px)" srcSet={ImagesHome.fondoGuaduaMobile}/>
                        <source media="(max-width: 1280px)" srcSet={ImagesHome.fondoGuaduaTablet}/>
                        <img src={ImagesHome.fondoGuadua} alt="Fondo de la ciudad de Cúcuta"
                             className="w-full h-full object-cover"/>
                    </picture>
                    <div className="absolute inset-0 bg-black/70"></div>
                </div>
                <div className="relative z-10 container mx-auto text-center px-8">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="font-nav font-bold text-5xl md:text-6xl">Ofrecemos Múltiples Soluciones
                            Tecnológicas</h1>
                    </div>
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link to="/details#service2"
                              className="group flex flex-col items-center justify-center p-6 border border-white/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#f30519]/40 transition-all duration-300 h-full">
                            <FiletypeHtml className="text-4xl text-accent"/>
                            <h2 className="font-bold mt-3 text-lg text-white/80 group-hover:text-accent transition-colors">
                                Desarrollo Web</h2>
                        </Link>
                        <Link to="/details#service3"
                              className="group flex flex-col items-center justify-center p-6 border border-white/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#f30519]/40 transition-all duration-300 h-full">
                            <Phone className="text-4xl text-accent"/>
                            <h2 className="font-bold mt-3 text-lg text-white/80 group-hover:text-accent transition-colors">
                                Desarrollo Móvil</h2>
                        </Link>
                        <Link to="/details#service4"
                              className="group flex flex-col items-center justify-center p-6 border border-white/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#f30519]/40 transition-all duration-300 h-full">
                            <BodyText className="text-4xl text-accent"/>
                            <h2 className="font-bold mt-3 text-lg text-white/80 group-hover:text-accent transition-colors">
                                Administración</h2>
                        </Link>
                        <Link to="/details#service5"
                              className="group flex flex-col items-center justify-center p-6 border border-white/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#f30519]/40 transition-all duration-300 h-full">
                            <Disc className="text-4xl text-accent"/>
                            <h2 className="font-bold mt-3 text-lg text-white/80 group-hover:text-accent transition-colors">
                                Software</h2>
                        </Link>
                    </div>
                </div>
            </section>

            <hr className="container mx-auto border-t border-white/30 my-16"/>

            {/* Services Section */}
            <section id="services" className="py-16 bg-black text-white">
                <div className="container mx-auto px-4 md:px-16">
                    <div className="mb-12">
                        <h2 className="font-heading text-4xl font-bold uppercase text-white mt-2 title-underline">Resumen
                            de servicios</h2>
                    </div>
                    <div className="w-full">
                        <Carousel slidesToShow={slidesToShow}>
                            {services.map(({IconComponent, title, description}, index) => (
                                <div key={index}
                                     className="bg-surface p-8 text-center border border-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-[#f30519]/40 hover:-translate-y-2 flex flex-col rounded-lg h-full">
                                    <div
                                        className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-md bg-red-800 text-white">
                                        <IconComponent className="text-4xl"/>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
                                    <p className="text-white/90 flex-grow text-lg">{description}</p>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </section>

            <hr className="container mx-auto border-t border-white/30 my-16"/>

            {/* Process Section */}
            <section id="process" className="py-16 bg-surface text-white">
                <div className="container mx-auto px-4">
                    <div className="text-end mb-16">
                        <h2 className="font-heading text-4xl font-bold uppercase text-white mt-2 title-underline">Nuestro
                            Proceso de Trabajo</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* NOTA: Las animaciones y sus delays se pueden manejar con un hook de IntersectionObserver */}
                        <div
                            className="relative p-8 border border-white/10 text-center hover:shadow-lg hover:shadow-[#f30519]/40 hover:-translate-y-3">
                            <div className="absolute top-4 right-4 font-heading text-6xl text-red-800">01</div>
                            <div className="mb-4 text-accent text-4xl"><Search/></div>
                            <h3 className="text-xl font-bold mb-2 text-white">Análisis y Consulta</h3>
                            <p className="text-white/90">Escuchamos tus ideas y objetivos para definir el alcance y la estrategia perfecta.</p>
                        </div>
                        <div
                            className="relative p-8 border border-white/10 text-center hover:shadow-lg hover:shadow-[#f30519]/40 hover:-translate-y-3">
                            <div className="absolute top-4 right-4 font-heading text-6xl text-red-800">02</div>
                            <div className="mb-4 text-accent text-4xl"><Palette/></div>
                            <h3 className="text-xl font-bold mb-2 text-white">Diseño y Prototipo</h3>
                            <p className="text-white/90">Creamos interfaces intuitivas y atractivas, presentándote un prototipo interactivo.</p>
                        </div>
                        <div
                            className="relative p-8 border border-white/10 text-center hover:shadow-lg hover:shadow-[#f30519]/40 hover:-translate-y-3">
                            <div className="absolute top-4 right-4 font-heading text-6xl text-red-800">03</div>
                            <div className="mb-4 text-accent text-4xl"><CodeSlash/></div>
                            <h3 className="text-xl font-bold mb-2 text-white">Desarrollo</h3>
                            <p className="text-white/90">Nuestros expertos dan vida al diseño con código limpio, escalable y optimizado.</p>
                        </div>
                        <div
                            className="relative p-8 border border-white/10 text-center hover:shadow-lg hover:shadow-[#f30519]/40 hover:-translate-y-3">
                            <div className="absolute top-4 right-4 font-heading text-6xl text-red-800">04</div>
                            <div className="mb-4 text-accent text-4xl"><RocketTakeoff/></div>
                            <h3 className="text-xl font-bold mb-2 text-white">Lanzamiento y Soporte</h3>
                            <p className="text-white/90">Desplegamos tu proyecto y ofrecemos soporte continuo para asegurar su funcionamiento.</p>
                        </div>
                    </div>
                </div>
            </section>

            <hr className="container mx-auto border-t border-white/30 my-16"/>

            {/* Portfolio Section */}
            <section id="portfolio" className="py-16 bg-surface">
                <div className="container mx-auto px-4">
                    <div className="relative z-10 container mx-auto text-center px-4 my-8">
                        <h2 className="font-heading text-4xl font-bold uppercase text-white title-underline">Proyectos
                            que Hablan por Sí Mismos</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-white/80 text-lg">
                            Cada línea de código y cada pixel están diseñados con un propósito. Explora nuestro
                            portafolio y descubre cómo transformamos ideas en realidades digitales.
                        </p>
                        <Link to="/portfolio"
                              className="inline-block mt-8 bg-accent text-white font-bold uppercase tracking-wider py-3 px-8 rounded-md transition-all duration-300 shadow-lg shadow-[#f30519]/50 hover:bg-red-800 hover:scale-105">
                            Ver Portafolio Completo
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                        <div className="flex justify-center items-center p-4">
                            <img src={ImagesClients.liderplast} alt="Logo del cliente Liderplast"
                                 className="h-16 w-full object-contain grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-110"/>
                        </div>
                        <div className="flex justify-center items-center p-4">
                            <img src={ImagesClients.sena2023} alt="Logo del cliente Sena 2023"
                                 className="h-16 w-full object-contain grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-110"/>
                        </div>
                        <div className="flex justify-center items-center p-4">
                            <img src={ImagesClients.encontrable} alt="Logo del cliente Encontrable"
                                 className="h-16 w-full object-contain grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-110"/>
                        </div>
                        <div className="flex justify-center items-center p-4">
                            <img src={ImagesClients.powerTeam} alt="Logo del cliente Power Team"
                                 className="h-16 w-full object-contain grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-110"/>
                        </div>
                        <div className="flex justify-center items-center p-4">
                            <img src={ImagesClients.advise} alt="Logo del cliente Advise"
                                 className="h-16 w-full object-contain grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-110"/>
                        </div>
                        <div className="flex justify-center items-center p-4">
                            <img src={ImagesClients.gallinasCasa} alt="Logo del cliente Gallinas de Casa"
                                 className="h-16 w-full object-contain grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-110"/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
