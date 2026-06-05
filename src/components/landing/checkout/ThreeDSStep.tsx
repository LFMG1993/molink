import { useEffect, useRef } from 'react';
import { Loader2, Shield } from 'lucide-react';
import { wompiService } from '../../../services/shared/wompiService.ts';

interface ThreeDSStepProps {
    redirectUrl: string;
    transactionId: string;
    onSuccess: () => void;
    onError: (msg: string) => void;
}

/** Paso de autenticación 3DS. */
export function ThreeDSStep({ redirectUrl, transactionId, onSuccess, onError }: ThreeDSStepProps) {
    const popupRef = useRef<Window | null>(null);

    useEffect(() => {
        popupRef.current = window.open(redirectUrl, '3DS_Auth', 'width=520,height=640');

        async function check() {
            try {
                const res = await wompiService.getTransactionStatus(transactionId);
                res.status === 'APPROVED'
                    ? onSuccess()
                    : onError('El pago no fue aprobado. Intenta con otra tarjeta.');
            } catch {
                onError('No se pudo verificar el estado del pago. Revisa tu correo.');
            }
        }

        const handleMsg = (e: MessageEvent) => {
            if (e.origin !== window.location.origin || e.data !== '3ds_complete') return;
            clearInterval(poll);
            check();
        };
        window.addEventListener('message', handleMsg);

        const poll = setInterval(() => {
            if (popupRef.current?.closed) {
                clearInterval(poll);
                window.removeEventListener('message', handleMsg);
                check();
            }
        }, 1000);

        return () => {
            clearInterval(poll);
            window.removeEventListener('message', handleMsg);
        };
    }, []);

    return (
        <div className="text-center py-8 space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                <Shield size={36} className="text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Autenticación 3DS</h3>
            <p className="text-white/50 text-sm">Se abrió una ventana de tu banco. No cierres esta página.</p>
            <div className="flex items-center justify-center gap-2 text-white/30 text-xs">
                <Loader2 size={14} className="animate-spin" /> Esperando autenticación...
            </div>
            <a
                href={redirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#f30519] underline"
            >
                ¿No se abrió? Haz clic aquí
            </a>
        </div>
    );
}

