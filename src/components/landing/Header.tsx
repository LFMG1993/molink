import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {ImagesHome} from "../../utils/images.ts";
import { Menu, X, Globe, User, LogOut, ChevronDown } from 'lucide-react';
import { useUserAuth } from '../../context/store/UserAuthContext.tsx';
import { LoginModal } from './LoginModal.tsx';

const Header = () => {
    const { t, i18n } = useTranslation();
    const { customer, isAuthenticated, logout } = useUserAuth();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const getStoreUrl = () => {
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;
        const port = window.location.port ? `:${window.location.port}` : '';
        if (hostname.includes('localhost')) {
            return `${protocol}//tienda.localhost${port}`;
        }
        return `${protocol}//tienda.molink.com.co`;
    };
    const storeUrl = getStoreUrl();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(newLang);
    };

    const currentLang = i18n.language || 'es';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = () => {
        setMobileMenuOpen(false);
        setShowUserMenu(false);
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
                    <nav id="navmenu" className="hidden xl:flex items-center">
                        <ul className="flex items-center space-x-1">
                            <li>
                                <Link to="/#start" aria-label="boton inicio"
                                          className="block rounded-md px-3 py-2 font-nav text-base text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#f30519]/40">
                                    {t('landing.nav.home')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/portfolio" aria-label="boton Portafolio"
                                      className="block rounded-md px-3 py-2 font-nav text-base text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#f30519]/40">
                                    {t('landing.nav.portfolio')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/details" aria-label="boton de servicios"
                                          className="block rounded-md px-3 py-2 font-nav text-base text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#f30519]/40">
                                    {t('landing.nav.services')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/pricing" aria-label="boton precios"
                                          className="block rounded-md px-3 py-2 font-nav text-base text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#f30519]/40">
                                    {t('landing.nav.pricing')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" aria-label="boton preguntas frecuentes"
                                          className="block rounded-md px-3 py-2 font-nav text-base text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#f30519]/40">
                                    {t('landing.nav.faq')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" aria-label="boton contacto"
                                          className="block rounded-md px-3 py-2 font-nav text-base text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#f30519]/40">
                                    {t('landing.nav.contact')}
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={toggleLanguage}
                                    className="flex items-center gap-2 ml-2 px-3 py-2 rounded-md border border-white/30 text-white font-nav text-sm hover:bg-white/10 transition-all"
                                    aria-label="Cambiar idioma"
                                >
                                    <Globe size={18} />
                                    <span className="uppercase">{currentLang}</span>
                                </button>
                            </li>

                            {/* Auth */}
                            <li>
                                {isAuthenticated && customer ? (
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowUserMenu(prev => !prev)}
                                            className="flex items-center gap-2 ml-2 px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white text-sm hover:bg-white/15 transition-all"
                                        >
                                            <User size={16} />
                                            <span className="max-w-[100px] truncate">{customer.name.split(' ')[0]}</span>
                                            <ChevronDown size={14} className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                                        </button>
                                        {showUserMenu && (
                                            <div className="absolute right-0 top-full mt-2 w-44 bg-[#111] border border-white/10 rounded-xl shadow-xl py-1 z-50">
                                                <a
                                                    href={`${storeUrl}/profile`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() => setShowUserMenu(false)}
                                                    className="flex items-center gap-2 px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/5 text-sm transition-colors"
                                                >
                                                    <User size={15} /> Mi Cuenta
                                                </a>
                                                <button
                                                    onClick={() => { logout(); setShowUserMenu(false); }}
                                                    className="flex items-center gap-2 w-full px-4 py-2.5 text-red-400 hover:bg-red-500/10 text-sm transition-colors"
                                                >
                                                    <LogOut size={15} /> Cerrar sesión
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setShowLoginModal(true)}
                                        className="flex items-center justify-center ml-2 w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-all"
                                        aria-label="Ingresar"
                                    >
                                        <User size={17} />
                                    </button>
                                )}
                            </li>
                        </ul>
                    </nav>

                    {/* Botón del Menú Móvil */}
                    <button
                        id="mobile-nav-toggle"
                        className="xl:hidden text-white text-3xl z-50"
                        aria-label={isMobileMenuOpen ? "Cerrar menú móvil" : "Abrir menú móvil"}
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>
            </header>

            {/* Menú Móvil Desplegable */}
            <div
                id="mobile-nav-menu"
                className={`
                     fixed top-0 left-0 right-0 xl:hidden bg-black/80 shadow-lg pt-24 pb-8
                     transition-transform duration-500 ease-in-out z-40
                     ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}
                 `}
            >
                <ul className="flex flex-col items-center space-y-6">
                    <li><Link to="/#start" onClick={handleLinkClick} className="mobile-nav-link font-nav text-2xl text-white hover:text-accent">{t('landing.nav.home')}</Link></li>
                    <li><Link to="/portfolio" onClick={handleLinkClick} className="mobile-nav-link font-nav text-2xl text-white hover:text-accent">{t('landing.nav.portfolio')}</Link></li>
                    <li><Link to="/details" onClick={handleLinkClick} className="mobile-nav-link font-nav text-2xl text-white hover:text-accent">{t('landing.nav.services')}</Link></li>
                    <li><Link to="/pricing" onClick={handleLinkClick} className="mobile-nav-link font-nav text-2xl text-white hover:text-accent">{t('landing.nav.pricing')}</Link></li>
                    <li><Link to="/faq" onClick={handleLinkClick} className="mobile-nav-link font-nav text-2xl text-white hover:text-accent">{t('landing.nav.faq')}</Link></li>
                    <li><Link to="/contact" onClick={handleLinkClick} className="mobile-nav-link font-nav text-2xl text-white hover:text-accent">{t('landing.nav.contact')}</Link></li>
                    {isAuthenticated && customer ? (
                        <>
                            <li>
                                <a href={`${storeUrl}/profile`} target="_blank" rel="noopener noreferrer" onClick={handleLinkClick} className="flex items-center gap-2 font-nav text-xl text-white hover:text-accent">
                                    <User size={20} /> Mi Cuenta
                                </a>
                            </li>
                            <li>
                                <button
                                    onClick={() => { logout(); handleLinkClick(); }}
                                    className="flex items-center gap-2 font-nav text-xl text-red-400 hover:text-red-300"
                                >
                                    <LogOut size={20} /> Cerrar sesión
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <button
                                onClick={() => { setShowLoginModal(true); setMobileMenuOpen(false); }}
                                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white font-nav text-lg hover:bg-white/10 transition-all"
                            >
                                <User size={20} /> Ingresar
                            </button>
                        </li>
                    )}
                    <li>
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-2 px-4 py-2 rounded-md border border-white/30 text-white font-nav text-lg hover:bg-white/10 transition-all"
                            aria-label="Cambiar idioma"
                        >
                            <Globe size={20} />
                            <span className="uppercase">{currentLang}</span>
                        </button>
                    </li>
                </ul>
            </div>

            {/* Modal de login */}
            {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
        </>
    );
};

export default Header;