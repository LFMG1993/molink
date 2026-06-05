import { CheckCircle2, MessageCircle, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { whatsappNumber } from '../../../data/landing/pricing.data.ts';
import type { PackageWithPrice } from '../../../types';

interface PackageSuccessStepProps {
    pkg: PackageWithPrice;
    email: string;
    onDone: () => void;
}

/** Pantalla de éxito tras completar el pago de un paquete */
export function PackageSuccessStep({ pkg, email, onDone }: PackageSuccessStepProps) {
    const waMsg = `Hola, acabo de pagar el paquete "${pkg.name}". Mi email es ${email}. ¿Cuál es el siguiente paso?`;
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMsg)}`;

    return (
        <div className="text-center py-8 space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20">
                <CheckCircle2 size={40} className="text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">¡Pago exitoso!</h2>
            <p className="text-white/50 text-sm">
                Revisá <span className="text-white font-medium">{email}</span> para la confirmación.
                <br />Nos pondremos en contacto contigo para iniciar el proyecto.
            </p>
            <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 w-full justify-center bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
                <MessageCircle size={18} /> Coordinar por WhatsApp
            </a>
            <Link
                to="/profile"
                className="w-full flex items-center justify-center gap-2 border border-white/20 text-white/70 font-semibold py-3 rounded-lg hover:bg-white/5 transition-colors text-sm"
            >
                <User size={16} /> Ver mi perfil
            </Link>
            <button
                onClick={onDone}
                className="w-full border border-white/10 text-white/40 font-semibold py-2.5 rounded-lg hover:bg-white/5 transition-colors text-xs"
            >
                Ir al inicio →
            </button>
        </div>
    );
}
