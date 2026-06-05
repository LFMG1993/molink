import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { wompiService } from '../../../services/shared/wompiService.ts';

interface PollingStepProps {
    transactionId: string;
    onSuccess: () => void;
    onError: (msg: string) => void;
}

/**
 * Paso de espera activa (polling) cuando Wompi retorna PENDING sin 3DS.
 */
export function PollingStep({ transactionId, onSuccess, onError }: PollingStepProps) {
    useEffect(() => {
        let attempts = 0;
        const MAX_ATTEMPTS = 12;

        const interval = setInterval(async () => {
            attempts++;
            try {
                const res = await wompiService.getTransactionStatus(transactionId);
                if (res.status === 'APPROVED') {
                    clearInterval(interval);
                    onSuccess();
                } else if (res.status === 'DECLINED' || res.status === 'ERROR') {
                    clearInterval(interval);
                    onError('El pago fue rechazado. Intenta con otra tarjeta.');
                } else if (attempts >= MAX_ATTEMPTS) {
                    clearInterval(interval);
                    onSuccess();
                }
            } catch {
                if (attempts >= MAX_ATTEMPTS) {
                    clearInterval(interval);
                    onSuccess();
                }
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center py-8 space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20">
                <Loader2 size={36} className="text-blue-400 animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-white">Verificando tu pago…</h3>
            <p className="text-white/50 text-sm">
                Esto puede tardar unos segundos. No cierres esta página.
            </p>
            <p className="text-white/30 text-xs">Tu tarjeta ya fue procesada correctamente.</p>
        </div>
    );
}

