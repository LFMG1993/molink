import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Cookie} from 'react-bootstrap-icons';

export const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Comprueba si el consentimiento ya ha sido dado.
        const consent = localStorage.getItem('cookie_consent_molink');
        if (!consent) {
            // Si no hay registro, muestra el banner.
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        // Guarda la preferencia del usuario y oculta el banner.
        localStorage.setItem('cookie_consent_molink', 'accepted');
        setIsVisible(false);
    };

    const handleReject = () => {
        // Guarda la preferencia del usuario y oculta el banner.
        localStorage.setItem('cookie_consent_molink', 'rejected');
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-50 bg-black/50 text-white shadow-2xl border-t border-white/10"
            role="dialog"
            aria-live="polite"
            aria-label="Banner de consentimiento de cookies"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <Cookie className="h-8 w-8 text-accent flex-shrink-0 mt-1"/>
                        <p className="text-sm text-white/80">
                            Utilizamos cookies para mejorar tu experiencia de navegación y analizar el tráfico del
                            sitio. Al hacer clic en "Aceptar", aceptas nuestro uso de cookies. Puedes leer más en
                            nuestra{' '}
                            <Link to="/cookie-policy" className="font-semibold text-accent hover:underline">Política de
                                Cookies</Link>.
                        </p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-3 w-full sm:w-auto">
                        <button onClick={handleReject}
                                className="w-full sm:w-auto px-4 py-2 rounded-md border border-white/30 hover:bg-white/10 transition-colors">Rechazar
                        </button>
                        <button onClick={handleAccept}
                                className="w-full sm:w-auto px-4 py-2 rounded-md bg-accent hover:bg-red-800 transition-colors font-semibold">Aceptar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};