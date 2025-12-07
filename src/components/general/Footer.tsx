import {Link} from 'react-router-dom';
import { Envelope, GeoAlt, Github, Instagram, Linkedin, Whatsapp } from 'react-bootstrap-icons';

const Footer = () => {
    return (
        <>
            <hr className="container mx-auto border-t border-white/30 my-16"/>
            <footer id="contact" className="bg-surface py-12 text-white/70">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                        {/* Columna 1: Logo y Descripción */}
                        <div className="mb-4 md:mb-0">
                            <p className="text-sm text-white">Soluciones tecnológicas a medida para impulsar negocios en
                                la era digital.</p>
                        </div>

                        {/* Columna 2: Enlaces Rápidos */}
                        <div>
                            <h3 className="font-bold text-white mb-4 uppercase tracking-wider">Navegación</h3>
                            <ul className="space-y-2">
                                <li><Link to="/#start" className="hover:text-red-700 transition-colors">Inicio</Link></li>
                                <li><Link to="/#services" className="hover:text-red-700 transition-colors">Servicios</Link></li>
                                <li><Link to="/#process" className="hover:text-red-700 transition-colors">Nuestro Proceso</Link></li>
                                <li><Link to="/portfolio" className="hover:text-red-700 transition-colors">Portafolio</Link></li>
                            </ul>
                        </div>

                        {/* Columna 3: Contacto */}
                        <div>
                            <h3 className="font-bold text-white mb-4 uppercase tracking-wider">Contacto</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start hover:-translate-y-1 transition-all">
                                    <Whatsapp className="mr-2 mt-1 text-green-700" />
                                    <a href="https://wa.me/573155756600" target="_blank" rel="noopener noreferrer"
                                       className="hover:text-red-700 transition-colors">
                                        +57 315 575 6600
                                    </a>
                                </li>
                                <li className="flex items-start hover:-translate-y-1 transition-all">
                                    <Envelope className="mr-2 mt-1 text-blue-600" />
                                    <a href="mailto:contacto@molink.com.co" target="_blank" rel="noopener noreferrer"
                                       className="hover:text-red-700 transition-colors">
                                        contacto@molink.com.co
                                    </a>
                                </li>
                                <li className="flex items-start hover:-translate-y-1 transition-all">
                                    <GeoAlt className="mr-2 mt-1 text-red-800" />
                                    <span>Cúcuta, Colombia</span>
                                </li>
                            </ul>
                        </div>

                        {/* Columna Redes Sociales */}
                        <div>
                            <h3 className="font-bold text-white mb-4 uppercase tracking-wider">Síguenos</h3>
                            <div className="flex space-x-4">
                                <a href="https://www.linkedin.com/in/lfmg1993/" target="_blank"
                                   rel="noopener noreferrer" aria-label="LinkedIn"
                                   className="text-2xl hover:-translate-y-1 transition-all">
                                    <Linkedin />
                                </a>
                                <a href="https://github.com/LFMG1993" target="_blank" rel="noopener noreferrer"
                                   aria-label="GitHub" className="text-2xl hover:-translate-y-1 transition-all">
                                    <Github />
                                </a>
                                <a href="https://www.instagram.com/molink_tecnologia/" target="_blank" rel="noopener noreferrer"
                                   aria-label="Instagram" className="text-2xl hover:-translate-y-1 transition-all">
                                    <Instagram />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div
                        className="mt-12 pt-8 border-t border-white/10 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Molink Tecnología.
                            Todos los derechos reservados.</p>
                        <div className="flex space-x-4">
                            <Link to="/privacity" className="hover:text-red-700 transition-colors">Política de
                                Privacidad</Link>
                            <span className="text-white/30">|</span>
                            <Link to="/termService" className="hover:text-red-700 transition-colors">Términos de
                                Servicio</Link>
                            <span className="text-white/30">|</span>
                            <Link to="/cookie-policy" className="hover:text-red-700 transition-colors">Politica de
                                Cookies</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;