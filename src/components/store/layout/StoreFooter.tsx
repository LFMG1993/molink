import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Github, Instagram, Linkedin, MessageCircle, ChevronRight } from 'lucide-react';
import { ImagesHome } from "../../../utils/images.ts";

export const StoreFooter = () => {
    const { t } = useTranslation();

    const getLandingUrl = () => {
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;

        if (hostname.includes('localhost')) {
            return `${protocol}//localhost:5173`;
        }
        return `${protocol}//molink.com.co`;
    };

    const landingUrl = getLandingUrl();

    return (
        <footer id="contact" className="w-full overflow-hidden bg-black pt-16">
            <div className="container mx-auto px-4">

                <div className="mb-12 flex justify-center lg:justify-start">
                    <img src={ImagesHome.logoWhite} alt="Molink" className="h-10 w-auto opacity-90" />
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
                    {/* Columna 1: Enlaces Rápidos */}
                    <div>
                        <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">{t('landing.footer.quick_links')}</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href={`${landingUrl}/#start`}
                                    className="flex items-center group text-white/60 hover:text-white transition-all">
                                    <ChevronRight size={14}
                                        className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    {t('landing.nav.home')}
                                </a>
                            </li>
                            <li>
                                <a href={`${landingUrl}/#services`}
                                    className="flex items-center group text-white/60 hover:text-white transition-all">
                                    <ChevronRight size={14}
                                        className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    {t('landing.nav.services')}
                                </a>
                            </li>
                            <li>
                                <a href={`${landingUrl}/#process`}
                                    className="flex items-center group text-white/60 hover:text-white transition-all">
                                    <ChevronRight size={14}
                                        className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    {t('landing.process.title')}
                                </a>
                            </li>
                            <li>
                                <a href={`${landingUrl}/#pricing`}
                                    className="flex items-center group text-white/60 hover:text-white transition-all">
                                    <ChevronRight size={14}
                                        className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    {t('landing.footer.subscription')}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 2: Tienda y Legal */}
                    <div>
                        <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Molink Store</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/products"
                                    className="flex items-center group text-white/60 hover:text-white transition-all">
                                    <ChevronRight size={14}
                                        className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    Todos los productos
                                </Link>
                            </li>
                            <li>
                                <Link to="/products?offers=true"
                                    className="flex items-center group text-white/60 hover:text-white transition-all">
                                    <ChevronRight size={14}
                                        className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    Ofertas Flash
                                </Link>
                            </li>
                            <li>
                                <a href={`${landingUrl}/faq`}
                                    className="flex items-center group text-white/60 hover:text-white transition-all">
                                    <ChevronRight size={14}
                                        className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    {t('landing.nav.faq')}
                                </a>
                            </li>
                            <li>
                                <a href={`${landingUrl}/contact`}
                                    className="flex items-center group text-white/60 hover:text-white transition-all">
                                    <ChevronRight size={14}
                                        className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    {t('landing.nav.contact')}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 3: Contacto */}
                    <div className="col-span-2 lg:col-span-1">
                        <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">{t('landing.footer.contact_info')}</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 group">
                                <div
                                    className="p-2 rounded-lg bg-green-500/10 text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all">
                                    <MessageCircle size={16} />
                                </div>
                                <ChevronRight size={14}
                                    className="mr-2 opacity-0 -ml-8 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                <a href="https://wa.me/573155756600" target="_blank" rel="noopener noreferrer"
                                    className="text-white/60 hover:text-white transition-colors">
                                    +57 315 575 6600
                                </a>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div
                                    className="p-2 rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                    <Mail size={16} />
                                </div>
                                <ChevronRight size={14}
                                    className="mr-2 opacity-0 -ml-8 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                <a href="mailto:contacto@molink.com.co"
                                    className="text-white/60 hover:text-white transition-colors">
                                    contacto@molink.com.co
                                </a>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div
                                    className="p-2 rounded-lg bg-blue-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                                    <MapPin size={16} />
                                </div>
                                <ChevronRight size={14}
                                    className="mr-2 opacity-0 -ml-8 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                <a href="https://maps.app.goo.gl/Y9QtXrRtCZbJSenL9"
                                    className="text-white/60 hover:text-white transition-colors" target={"_blank"} rel="noopener noreferrer">
                                    Cúcuta, Colombia
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Columna Redes Sociales */}
                    <div className="col-span-2 lg:col-span-1">
                        <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Síguenos</h3>
                        <div className="flex gap-4">
                            <a href="https://www.linkedin.com/in/lfmg1993/" target="_blank" rel="noopener noreferrer"
                                className="p-3 rounded-full bg-white/5 text-white/60 hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://github.com/LFMG1993" target="_blank" rel="noopener noreferrer"
                                className="p-3 rounded-full bg-white/5 text-white/60 hover:bg-slate-700 hover:text-white hover:-translate-y-1 transition-all">
                                <Github size={20} />
                            </a>
                            <a href="https://www.instagram.com/molink_tecnologia/" target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-white/5 text-white/60 hover:bg-pink-600 hover:text-white hover:-translate-y-1 transition-all">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div
                    className="py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
                    <p>&copy; {new Date().getFullYear()} Molink Tecnología. {t('landing.footer.rights')}</p>
                    <div className="flex items-center gap-4">
                        <a href={`${landingUrl}/privacity`}
                            className="hover:text-white transition-colors">{t('legal.privacy.title')}</a>
                        <span className="text-white/30">|</span>
                        <a href={`${landingUrl}/termService`}
                            className="hover:text-white transition-colors">{t('legal.terms.title')}</a>
                        <span className="text-white/30">|</span>
                        <a href={`${landingUrl}/cookie-policy`}
                            className="hover:text-white transition-colors">{t('legal.cookies.title')}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};