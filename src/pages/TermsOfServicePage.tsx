import { Link } from 'react-router-dom';
import { SEO } from '../components/general/SEO';
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';

// Componente reutilizable para cada sección del documento legal.
// Aplica la animación de fade-in automáticamente.
const LegalSection = ({ title, children, delay = 0 }: { title: string, children: React.ReactNode, delay?: number }) => {
    const [ref, style] = useFadeInOnScroll({ delay });
    return (
        <div ref={ref} style={style}>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">{title}</h2>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
};

const TermsOfServicePage = () => {
    return (
        <>
            <SEO
                title="Términos de Servicio"
                description="Términos y condiciones de uso para los servicios ofrecidos por Molink Tecnología."
                keywords="términos de servicio, condiciones, legal, molink, tecnología, cúcuta"
                canonicalUrl="/termService"
            />

            {/* Page Header */}
            <section className="relative py-24 bg-surface">
                <div className="container mx-auto text-center px-4">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white title-underline">
                        Términos de Servicio
                    </h1>
                    <p className="mt-8 text-white/70">Última actualización: 24 de Julio de 2024</p>
                </div>
            </section>

            {/* Terms Content Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-12 text-white/80 text-lg leading-relaxed">

                        <LegalSection title="1. ACEPTACIÓN DE LOS TÉRMINOS">
                            <p>Al acceder o utilizar los servicios ofrecidos por Molink Tecnología, usted (en adelante, "el Usuario") acepta y se compromete a cumplir con los presentes Términos de Servicio. Si no está de acuerdo con estos términos, no podremos prestarle un servicio.</p>
                        </LegalSection>

                        <LegalSection title="2. DESCRIPCIÓN DE LOS SERVICIOS" delay={100}>
                            <p>Molink Tecnología ofrece una variedad de servicios, incluyendo pero no limitado a:</p>
                            <ul className="list-disc list-inside space-y-3 pl-4">
                                <li><strong>Páginas de presentación:</strong> Diseño y desarrollo de páginas web para presentar información sobre negocios, productos o servicios.</li>
                                <li><strong>Desarrollo web:</strong> Creación y mantenimiento de sitios web personalizados, incluyendo diseño, desarrollo front-end y back-end.</li>
                                <li><strong>Desarrollo móvil:</strong> Desarrollo de aplicaciones móviles nativas o multiplataforma para dispositivos iOS y Android.</li>
                                <li><strong>Marketing digital:</strong> Servicios de publicidad en línea, optimización para motores de búsqueda (SEO) y gestión de redes sociales.</li>
                                <li><strong>Venta de licencias de software:</strong> Comercialización de licencias de software de terceros, sujeta a los términos del proveedor.</li>
                                <li><strong>Administración de sitios web:</strong> Mantenimiento técnico, actualizaciones, seguridad y soporte para sitios web existentes.</li>
                                <li><strong>Venta de hosting y dominio:</strong> Servicios de alojamiento web y registro de nombres de dominio como intermediario.</li>
                                <li><strong>Soporte remoto:</strong> Asistencia técnica a distancia para resolver problemas relacionados con los Servicios.</li>
                            </ul>
                        </LegalSection>

                        <LegalSection title="3. USO DE LOS SERVICIOS" delay={100}>
                            <p>El Usuario se compromete a:</p>
                            <ul className="list-disc list-inside space-y-3 pl-4">
                                <li>Utilizar los Servicios de acuerdo con estos Términos, las leyes aplicables en Colombia y las buenas costumbres.</li>
                                <li>Ser responsable de la información que proporciona, garantizando que tiene los derechos necesarios para su uso.</li>
                                <li>No utilizar los Servicios para fines ilegales o no autorizados, como la distribución de contenido ilegal, violación de derechos de autor o envío de spam.</li>
                            </ul>
                        </LegalSection>

                        <LegalSection title="4. CUENTAS DE USUARIO" delay={100}>
                            <p>Para acceder a ciertos Servicios, puede ser necesario crear una cuenta. El Usuario es responsable de:</p>
                            <ul className="list-disc list-inside space-y-3 pl-4">
                                <li>Mantener la confidencialidad de su contraseña.</li>
                                <li>Notificar a Molink Tecnología en caso de uso no autorizado de su cuenta.</li>
                                <li>Entender que Molink Tecnología se reserva el derecho de suspender o cancelar cuentas en caso de incumplimiento de estos Términos.</li>
                            </ul>
                        </LegalSection>

                        <LegalSection title="5. PAGOS" delay={100}>
                            <p>Algunos servicios requieren el pago de tarifas. Los precios se indican en la plataforma y pueden estar sujetos a cambios con previo aviso. Los pagos se realizan a través de los métodos disponibles y se emitirán facturas electrónicas conforme a la normativa colombiana. La mora en el pago puede resultar en la suspensión o cancelación de los servicios.</p>
                        </LegalSection>

                        <LegalSection title="6. PROPIEDAD INTELECTUAL" delay={100}>
                            <p>La Plataforma y su contenido son propiedad de Molink Tecnología y están protegidos por leyes de propiedad intelectual. El Usuario no puede utilizar el contenido sin autorización previa por escrito. El Usuario conserva la propiedad intelectual del contenido que proporciona, pero otorga a Molink Tecnología una licencia no exclusiva para utilizar dicho contenido en la prestación de los Servicios.</p>
                        </LegalSection>

                        <LegalSection title="7. PROTECCIÓN DE DATOS PERSONALES" delay={100}>
                            <p>
                                En cumplimiento de la Ley 1581 de 2012, trataremos los datos personales del Usuario de acuerdo con nuestra{' '}
                                <Link to="/privacity" className="text-accent hover:underline">
                                    Política de Privacidad
                                </Link>
                                . El Usuario autoriza la recopilación y uso de sus datos para la prestación de los Servicios y tiene derecho a acceder, rectificar, actualizar y suprimir sus datos.
                            </p>
                        </LegalSection>

                        <LegalSection title="8. LIMITACIÓN DE RESPONSABILIDAD" delay={100}>
                            <p>Los Servicios se proporcionan "tal cual", sin garantías. Molink Tecnología no se hace responsable de daños y perjuicios derivados del uso de los Servicios. Nuestra responsabilidad se limita al monto pagado por el Usuario por los Servicios en los últimos seis (6) meses.</p>
                        </LegalSection>

                        <LegalSection title="9. MODIFICACIÓN DE LOS TÉRMINOS" delay={100}>
                            <p>Nos reservamos el derecho de modificar estos Términos de Servicio en cualquier momento. Los cambios se publicarán en la Plataforma y entrarán en vigor a partir de su publicación, con previo aviso a los usuarios.</p>
                        </LegalSection>

                        <LegalSection title="10. LEY APLICABLE Y JURISDICCIÓN" delay={100}>
                            <p>Estos Términos de Servicio se rigen por las leyes de la República de Colombia. Cualquier disputa se someterá a la jurisdicción exclusiva de los tribunales de Cúcuta, Colombia.</p>
                        </LegalSection>

                    </div>
                </div>
            </section>
        </>
    );
};

export default TermsOfServicePage;