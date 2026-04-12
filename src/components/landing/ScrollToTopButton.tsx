import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUpShort } from 'react-bootstrap-icons';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { pathname } = useLocation();

    // Muestra el botón cuando el usuario baja 300px
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Vuelve al inicio de la página suavemente
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // Efecto para mostrar/ocultar el botón al hacer scroll
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // Efecto para ir al inicio de la página en cada cambio de ruta
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-4 right-4 z-[9999] h-12 w-12 rounded-lg bg-red-800 text-white flex items-center justify-center transition-all duration-300 hover:bg-red-700 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            aria-label="Volver arriba"
        >
            <ArrowUpShort className="text-2xl" />
        </button>
    );
};

export default ScrollToTopButton;