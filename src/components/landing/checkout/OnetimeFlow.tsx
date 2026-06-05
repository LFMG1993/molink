import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Mail, MessageCircle, User } from 'lucide-react';
import { whatsappNumber } from '../../../data/landing/pricing.data.ts';
import { DarkInput } from './DarkInput.tsx';
import { PrimaryButton } from './PrimaryButton.tsx';
import type { WompiTrmRate } from '../../../types';

interface OnetimeFlowProps {
    productName: string;
    amountUsdMin: number;
    amountUsdMax: number;
    details: string;
    trm: WompiTrmRate | null;
}

/**
 * Flujo de cotización / pago único no estandarizado.
 * Recopila nombre y email, y redirige a WhatsApp para coordinar el pago.
 */
export function OnetimeFlow({ productName, amountUsdMin, amountUsdMax, details, trm }: OnetimeFlowProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const totalCopMin = trm ? Math.round(amountUsdMin * trm.usdCopRate) : null;
    const totalCopMax = trm ? Math.round(amountUsdMax * trm.usdCopRate) : null;

    const whatsappMsg = `Hola, quiero cotizar/pagar por: ${productName}. Estimado: $${amountUsdMin}-$${amountUsdMax} USD. ${details ? `Detalles: ${details}` : ''} Mi nombre: ${name}. Contacto: ${email}`;
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

    if (sent) {
        return (
            <div className="text-center space-y-5 py-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20">
                    <CheckCircle2 size={40} className="text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white">¡Solicitud enviada!</h3>
                <p className="text-white/50 text-sm">
                    Te contactaremos en las próximas horas para coordinar el pago seguro a través de Wompi.
                </p>
                <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 w-full justify-center bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                    <MessageCircle size={18} /> Escribir por WhatsApp
                </a>
                <Link to="/pricing" className="block text-white/40 text-sm hover:text-white/70 transition-colors">
                    ← Volver a precios
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-5">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                <p className="text-white font-semibold">{productName}</p>
                {details && <p className="text-white/50 text-xs">{details}</p>}
                <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
                    <span className="text-white">Estimado</span>
                    <div className="text-right">
                        <p className="text-white">${amountUsdMin} – ${amountUsdMax} USD</p>
                        {totalCopMin && totalCopMax && (
                            <p className="text-white/30 text-xs font-normal">
                                ≈ {totalCopMin.toLocaleString('es-CO')} – {totalCopMax.toLocaleString('es-CO')} COP
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-lg px-4 py-3">
                <p className="text-yellow-300 text-xs">
                    Para proyectos únicos, recopilamos tus datos y te contactamos para coordinar el pago seguro a través de Wompi.
                </p>
            </div>

            <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <DarkInput className="pl-9" type="text" placeholder="Nombre completo"
                    value={name} onChange={e => setName(e.target.value)} required minLength={2} />
            </div>
            <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <DarkInput className="pl-9" type="email" placeholder="tu@email.com"
                    value={email} onChange={e => setEmail(e.target.value)} required />
            </div>

            <PrimaryButton type="submit">Enviar solicitud de pago →</PrimaryButton>

            <div className="relative flex items-center my-1">
                <div className="flex-1 border-t border-white/10" />
                <span className="mx-3 text-white/30 text-xs">o</span>
                <div className="flex-1 border-t border-white/10" />
            </div>

            <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-white/20 text-white/70 font-semibold py-3 rounded-lg hover:bg-white/5 transition-colors text-sm"
            >
                <MessageCircle size={16} /> Contactar por WhatsApp directamente
            </a>
        </form>
    );
}

