import { useState } from 'react';
import { CreditCard, ChevronDown } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton.tsx';
import type { WompiPaymentSource } from '../../../types';

interface SavedCardsSectionProps {
    sources: WompiPaymentSource[];
    loading: boolean;
    onPay: (wompiSourceId: number) => void;
    onUseNew: () => void;
}

const brandColor: Record<string, string> = {
    VISA: 'text-blue-400',
    MASTERCARD: 'text-orange-400',
    AMEX: 'text-green-400',
};

/** Selector de tarjetas guardadas. Muestra las fuentes de pago del usuario y permite elegir una. */
export function SavedCardsSection({ sources, loading, onPay, onUseNew }: SavedCardsSectionProps) {
    const defaultSource = sources.find(s => s.isDefault) ?? sources[0];
    const [selectedId, setSelectedId] = useState<number>(defaultSource.wompiSourceId);

    return (
        <div className="space-y-3">
            <p className="text-white/50 text-xs uppercase tracking-wider font-bold">
                Tarjetas guardadas
            </p>

            {sources.map(src => {
                const selected = src.wompiSourceId === selectedId;
                return (
                    <button
                        key={src.id}
                        type="button"
                        onClick={() => setSelectedId(src.wompiSourceId)}
                        className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3 transition-all text-left ${
                            selected
                                ? 'border-white/40 bg-white/10'
                                : 'border-white/10 bg-white/5 hover:border-white/25'
                        }`}
                    >
                        {/* Radio visual */}
                        <div
                            className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                                selected ? 'border-white' : 'border-white/30'
                            }`}
                        >
                            {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>

                        <CreditCard
                            size={18}
                            className={`shrink-0 ${brandColor[src.cardBrand] ?? 'text-white/50'}`}
                        />

                        <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-semibold">
                                {src.cardBrand} •••• {src.lastFour}
                                {src.isDefault && (
                                    <span className="ml-2 text-[10px] uppercase tracking-wider bg-white/10 text-white/50 px-1.5 py-0.5 rounded">
                                        Predeterminada
                                    </span>
                                )}
                            </p>
                            <p className="text-white/40 text-xs">
                                {src.cardHolder} · Vence {src.expMonth}/{src.expYear}
                            </p>
                        </div>
                    </button>
                );
            })}

            <PrimaryButton type="button" loading={loading} onClick={() => onPay(selectedId)}>
                {loading ? 'Procesando...' : 'Pagar con esta tarjeta'}
            </PrimaryButton>

            <div className="relative flex items-center">
                <div className="flex-1 border-t border-white/10" />
                <span className="mx-3 text-white/30 text-xs">o</span>
                <div className="flex-1 border-t border-white/10" />
            </div>

            <button
                type="button"
                onClick={onUseNew}
                className="w-full flex items-center justify-center gap-1.5 text-white/50 text-sm hover:text-white/80 transition-colors py-1"
            >
                <ChevronDown size={14} />
                Usar otra tarjeta
            </button>
        </div>
    );
}

