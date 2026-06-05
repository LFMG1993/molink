import { CheckCircle2, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SubscriptionSuccessStepProps {
    email: string;
    onDone: () => void;
}

/** Pantalla de éxito tras activar una suscripción */
export function SubscriptionSuccessStep({ email, onDone }: SubscriptionSuccessStepProps) {
    return (
        <div className="text-center py-8 space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20">
                <CheckCircle2 size={40} className="text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">¡Suscripción activa!</h2>
            <p className="text-white/50 text-sm">
                Revisá <span className="text-white font-medium">{email}</span> para los detalles.
            </p>
            <Link
                to="/profile"
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3.5 rounded-lg hover:bg-green-700 transition-colors"
            >
                <User size={18} /> Ver mi perfil
            </Link>
            <button
                onClick={onDone}
                className="w-full border border-white/10 text-white/50 font-semibold py-3 rounded-lg hover:bg-white/5 transition-colors text-sm"
            >
                Ir al inicio →
            </button>
        </div>
    );
}
