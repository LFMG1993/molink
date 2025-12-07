import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {ImagesHome} from "../../utils/images.ts";
import { List, X } from 'react-bootstrap-icons';

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Efecto para manejar el cambio de fondo del header al hacer scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Limpieza del evento al desmontar el componente
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Función para cerrar el menú móvil al hacer clic en un enlace
    const handleLinkClick = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            <header
                id="header"
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 shadow-lg' : 'bg-transparent'}`}
            >
                <div className="container mx-auto flex items-center justify-between p-4">
                    <Link to="/" className="flex items-center" onClick={handleLinkClick}>
                        <img src={ImagesHome.logoWhite} alt="Logo de Molink Tecnologia Blanco" className="h-12 w-auto" />
                    </Link>

                    {/* Menú de Navegación Desktop */}
                    <nav id="navmenu" className="hidden lg:flex">
                        <ul className="flex items-center space-x-2">
                            <li>
                                <Link to="/#start" aria-label="boton inicio"
                                          className="block rounded-md px-4 py-2 font-nav text-xl text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#f30519]/40">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link to="/portfolio" aria-label="boton Portafolio"
                                      className="block rounded-md px-4 py-2 font-nav text-xl text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#f30519]/40">
                                    Portafolio
                                </Link>
                            </li>
                            <li>
                                <Link to="/#services" aria-label="boton servicios"
                                          className="block rounded-md px-4 py-2 font-nav text-xl text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#f30519]/40">
                                    Servicios
                                </Link>
                            </li>
                            <li>
                                <Link to="/#contact" aria-label="boton contacto"
                                          className="block rounded-md px-4 py-2 font-nav text-xl text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#f30519]/40">
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Botón del Menú Móvil */}
                    <button
                        id="mobile-nav-toggle"
                        className="lg:hidden text-white text-3xl z-50"
                        aria-label={isMobileMenuOpen ? "Cerrar menú móvil" : "Abrir menú móvil"}
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <List />}
                    </button>
                </div>
            </header>

            {/* Menú Móvil Desplegable */}
            <div
                id="mobile-nav-menu"
                className={`
                     fixed top-0 left-0 right-0 lg:hidden bg-black/80 shadow-lg pt-24 pb-8
                     transition-transform duration-500 ease-in-out z-40
                     ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}
                 `}
            >
                <ul className="flex flex-col items-center space-y-6">
                    <li><Link to="/#start" onClick={handleLinkClick} className="mobile-nav-link font-nav text-2xl text-white hover:text-accent">Inicio</Link></li>
                    <li><Link to="/portfolio" onClick={handleLinkClick} className="mobile-nav-link font-nav text-2xl text-white hover:text-accent">Portafolio</Link></li>
                    <li><Link to="/#services" onClick={handleLinkClick} className="mobile-nav-link font-nav text-2xl text-white hover:text-accent">Servicios</Link></li>
                    <li><Link to="/#contact" onClick={handleLinkClick} className="mobile-nav-link font-nav text-2xl text-white hover:text-accent">Contacto</Link></li>
                </ul>
            </div>
        </>
    );
};

export default Header;