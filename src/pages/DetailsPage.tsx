import { SEO } from '../components/general/SEO';
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';

// Componente pequeño para las secciones para no repetir código
const ServiceSection = ({ id, title, children, delay = 0 }: { id: string, title: string, children: React.ReactNode, delay?: number }) => {
    const [ref, style] = useFadeInOnScroll({ delay });
    return (
        <div id={id} ref={ref} style={style} className="space-y-6 scroll-mt-28">
            <h3 className="font-heading text-3xl font-bold text-white">{title}</h3>
            {children}
        </div>
    );
};

const DetailsPage = () => {
    const [helpBoxRef, helpBoxStyle] = useFadeInOnScroll({ delay: 150 });
    const [navBoxRef, navBoxStyle] = useFadeInOnScroll();

    return (
        <>
            <SEO
                title="Detalles de Servicios"
                description="Conoce en detalle nuestros servicios de desarrollo web, aplicaciones móviles, administración de sitios, venta de licencias y soporte técnico."
                keywords="servicios de desarrollo, aplicaciones web, aplicaciones móviles, administración de sitios, soporte técnico"
                canonicalUrl="/details"
            />

            {/* Page Header */}
            <section className="relative py-24 bg-surface">
                <div className="container mx-auto text-center px-4">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white">Nuestros Servicios</h1>
                    <p className="mt-2 text-white/70">Soluciones a la medida para cada una de tus necesidades tecnológicas.</p>
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
                                    <h4 className="font-bold text-xl text-white mb-4">Lista de Servicios</h4>
                                    <ul className="space-y-2">
                                        <li><a href="#service1" className="block p-3 rounded-md hover:bg-white/10 transition-colors">Páginas de Presentación</a></li>
                                        <li><a href="#service2" className="block p-3 rounded-md hover:bg-white/10 transition-colors">Aplicaciones Web</a></li>
                                        <li><a href="#service3" className="block p-3 rounded-md hover:bg-white/10 transition-colors">Aplicaciones Móviles</a></li>
                                        <li><a href="#service4" className="block p-3 rounded-md hover:bg-white/10 transition-colors">Administración de Sitios</a></li>
                                        <li><a href="#service6" className="block p-3 rounded-md hover:bg-white/10 transition-colors">Venta de Licencias</a></li>
                                        <li><a href="#service7" className="block p-3 rounded-md hover:bg-white/10 transition-colors">Soporte Remoto</a></li>
                                    </ul>
                                </div>

                                {/* Caja de Ayuda */}
                                <div ref={helpBoxRef} style={helpBoxStyle} className="bg-surface border border-white/10 p-6 rounded-lg text-center">
                                    <i className="bi bi-headset text-4xl text-accent"></i>
                                    <h4 className="font-bold text-xl text-white mt-3">¿Tienes Preguntas?</h4>
                                    <p className="text-white/70 mt-1">Contáctanos para una asesoría personalizada.</p>
                                    <a href="https://wa.me/573155756600" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 bg-accent text-white font-bold uppercase tracking-wider py-2 px-6 rounded-md transition-all duration-300 hover:bg-red-800 hover:text-accent hover:scale-105">
                                        Hablar por WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Columna Derecha: Contenido de los Servicios */}
                        <div className="lg:col-span-8">
                            <ServiceSection id="service1" title="Páginas de Presentación">
                                <p className="text-white/80 text-lg">En la era digital, tu presencia en línea es fundamental. Una página web estática es la solución perfecta para establecer una base sólida en Internet de forma rápida, sencilla y económica.</p>
                                <ul className="space-y-4">
                                    <li className="flex items-start"><i className="bi bi-check-circle-fill text-accent mt-1 mr-3"></i><span><strong>Diseño profesional y personalizado:</strong> Creamos páginas a medida, adaptadas a la imagen de tu marca.</span></li>
                                    <li className="flex items-start"><i className="bi bi-check-circle-fill text-accent mt-1 mr-3"></i><span><strong>Optimización SEO básica:</strong> Mejoramos la visibilidad de tu página en buscadores como Google.</span></li>
                                    <li className="flex items-start"><i className="bi bi-check-circle-fill text-accent mt-1 mr-3"></i><span><strong>Fácil de mantener:</strong> Sencillas de gestionar para mantener tu información al día sin complicaciones.</span></li>
                                </ul>
                                <p className="text-white/80">No esperes más y da el salto a la presencia en línea. ¡Contáctanos hoy mismo para obtener un presupuesto personalizado!</p>
                            </ServiceSection>

                            <hr className="border-white/10 my-12" />

                            <ServiceSection id="service2" title="Aplicaciones Web" delay={100}>
                                <p className="text-white/80 text-lg">Las aplicaciones web son una herramienta imprescindible para impulsar el crecimiento, ya sea para mejorar la interacción con clientes, optimizar la gestión interna o lanzar nuevas funcionalidades.</p>
                                <ul className="space-y-4">
                                    <li className="flex items-start"><i className="bi bi-check-circle-fill text-accent mt-1 mr-3"></i><span><strong>Desarrollo a medida:</strong> Creamos aplicaciones adaptadas a tus necesidades y objetivos estratégicos.</span></li>
                                    <li className="flex items-start"><i className="bi bi-check-circle-fill text-accent mt-1 mr-3"></i><span><strong>Tecnologías de vanguardia:</strong> Usamos herramientas modernas para crear aplicaciones robustas, seguras y escalables.</span></li>
                                    <li className="flex items-start"><i className="bi bi-check-circle-fill text-accent mt-1 mr-3"></i><span><strong>Integración con sistemas existentes:</strong> Conectamos tu aplicación con tus plataformas actuales para optimizar procesos.</span></li>
                                </ul>
                            </ServiceSection>

                            <hr className="border-white/10 my-12" />

                            <ServiceSection id="service3" title="Aplicaciones Móviles" delay={100}>
                                <p className="text-white/80 text-lg">Lleva tu negocio a la palma de la mano de tus clientes. Una aplicación móvil es esencial para expandir tu alcance, mejorar la interacción y optimizar tus procesos.</p>
                                <ul className="space-y-4">
                                    <li className="flex items-start"><i className="bi bi-check-circle-fill text-accent mt-1 mr-3"></i><span><strong>Desarrollo nativo y multiplataforma:</strong> Creamos apps para iOS y Android, adaptadas a tu marca y objetivos.</span></li>
                                    <li className="flex items-start"><i className="bi bi-check-circle-fill text-accent mt-1 mr-3"></i><span><strong>Diseño UI/UX optimizado:</strong> Priorizamos la usabilidad para que tu aplicación sea atractiva y fácil de usar.</span></li>
                                    <li className="flex items-start"><i className="bi bi-check-circle-fill text-accent mt-1 mr-3"></i><span><strong>Publicación en tiendas:</strong> Te ayudamos a publicar tu aplicación en la App Store y Google Play.</span></li>
                                </ul>
                            </ServiceSection>

                            <hr className="border-white/10 my-12" />

                            <ServiceSection id="service4" title="Administración de Sitios" delay={100}>
                                <p className="text-white/80 text-lg">Tu sitio web es tu carta de presentación. Mantenerlo funcional, seguro y actualizado requiere tiempo y conocimientos. Te liberamos de estas tareas para que te concentres en tu negocio.</p>
                                <ul className="space-y-4">
                                    <li className="flex items-start"><i className="bi bi-check-circle-fill text-accent mt-1 mr-3"></i><span><strong>Mantenimiento técnico y seguridad:</strong> Mantenemos tu sitio actualizado y protegido contra vulnerabilidades.</span></li>
                                    <li className="flex items-start"><i className="bi bi-check-circle-fill text-accent mt-1 mr-3"></i><span><strong>Gestión de contenidos:</strong> Te ayudamos a mantener tu sitio fresco y relevante con contenido de calidad.</span></li>
                                    <li className="flex items-start"><i className="bi bi-check-circle-fill text-accent mt-1 mr-3"></i><span><strong>Optimización SEO continua:</strong> Mejoramos la visibilidad de tu sitio en los resultados de búsqueda de forma constante.</span></li>
                                </ul>
                            </ServiceSection>

                            <hr className="border-white/10 my-12" />

                            <ServiceSection id="service6" title="Venta de Licencias Originales" delay={100}>
                                <p className="text-white/80 text-lg">Contar con software original es fundamental para garantizar la productividad, seguridad y legalidad de tu empresa. Te damos acceso a todas las funcionalidades y soporte técnico.</p>
                                <ul className="space-y-4">
                                    <li className="flex items-start"><i className="bi bi-check-circle-fill text-accent mt-1 mr-3"></i><span><strong>Amplia variedad:</strong> Ofrecemos licencias de Microsoft (Office, Windows), Adobe, Canva y antivirus.</span></li>
                                    <li className="flex items-start"><i className="bi bi-check-circle-fill text-accent mt-1 mr-3"></i><span><strong>Asesoramiento personalizado:</strong> Te ayudamos a elegir las licencias que mejor se adaptan a tus necesidades.</span></li>
                                    <li className="flex items-start"><i className="bi bi-check-circle-fill text-accent mt-1 mr-3"></i><span><strong>Precios competitivos:</strong> Garantizamos la mejor relación calidad-precio del mercado.</span></li>
                                </ul>
                            </ServiceSection>

                            <hr className="border-white/10 my-12" />

                            <ServiceSection id="service7" title="Soporte Remoto" delay={100}>
                                <p className="text-white/80 text-lg">¿Problemas con tu ordenador o software? Nuestro servicio de soporte remoto te ofrece asistencia técnica experta para solucionar tus incidencias de forma rápida y eficiente, sin necesidad de desplazarte.</p>
                                <ul className="space-y-4">
                                    <li className="flex items-start"><i className="bi bi-check-circle-fill text-accent mt-1 mr-3"></i><span><strong>Conexión segura:</strong> Nos conectamos a tu ordenador de forma segura para diagnosticar y solucionar problemas.</span></li>
                                    <li className="flex items-start"><i className="bi bi-check-circle-fill text-accent mt-1 mr-3"></i><span><strong>Asistencia personalizada:</strong> Te brindamos atención y te guiamos paso a paso en la resolución de incidencias.</span></li>
                                    <li className="flex items-start"><i className="bi bi-check-circle-fill text-accent mt-1 mr-3"></i><span><strong>Soporte multidispositivo:</strong> Ofrecemos soporte para ordenadores, portátiles, tablets y smartphones.</span></li>
                                </ul>
                            </ServiceSection>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DetailsPage;