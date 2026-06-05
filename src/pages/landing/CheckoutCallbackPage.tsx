import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Página de callback para el flujo 3DS de Wompi.
 *
 * Wompi redirige aquí después de la autenticación bancaria.
 * Si se abrió como popup, notifica a la ventana padre y se cierra.
 * Si no hay ventana padre (redirección directa), vuelve al inicio.
 *
 * Ruta: /checkout/callback
 */
const CheckoutCallbackPage = () => {
    useEffect(() => {
        if (window.opener) {
            // Notificar al modal de checkout que el 3DS terminó
            window.opener.postMessage('3ds_complete', window.location.origin);
            window.close();
        } else {
            // Fallback: sin popup, redirigir al inicio después de 2 s
            const timer = setTimeout(() => {
                window.location.href = '/';
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
            <Loader2 size={36} className="animate-spin text-[#f30519]" />
            <p className="text-white/70 text-sm">Verificando pago...</p>
        </div>
    );
};

export default CheckoutCallbackPage;

