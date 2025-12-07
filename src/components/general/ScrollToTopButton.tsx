import { useState, useEffect } from 'react';
import { ArrowUpShort } from 'react-bootstrap-icons';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

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

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-4 right-4 z-[9999] h-10 w-10 rounded bg-red-800 text-white flex items-center justify-center transition-all duration-300 hover:bg-red-700 ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            aria-label="Volver arriba"
        >
            <ArrowUpShort className="text-2xl" />
        </button>
    );
};

export default ScrollToTopButton;