import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wompiService } from '../../../services/shared/wompiService.ts';
import { Spinner } from '../Spinner.tsx';
import { CreditCard, Star, Trash2 } from 'lucide-react';
import type { WompiPaymentSource } from '../../../types';

const brandIcon: Record<string, string> = {
    VISA: '💳 VISA',
    MASTERCARD: '💳 MC',
    AMEX: '💳 AMEX',
};

export function SavedCardsList() {
    const qc = useQueryClient();
    const [confirmId, setConfirmId] = useState<string | null>(null);

    const { data: cards = [], isLoading, isError } = useQuery<WompiPaymentSource[]>({
        queryKey: ['paymentSources'],
        queryFn: () => wompiService.getPaymentSources(),
    });

    const remove = useMutation({
        mutationFn: (id: string) => wompiService.deletePaymentSource(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['paymentSources'] });
            setConfirmId(null);
        },
    });

    if (isLoading) return <div className="flex justify-center py-16"><Spinner /></div>;

    if (isError) {
        return (
            <div className="py-8 text-center text-red-400 bg-red-500/10 rounded-xl border border-red-500/20">
                No pudimos cargar tus tarjetas. Intenta más tarde.
            </div>
        );
    }

    if (cards.length === 0) {
        return (
            <div className="py-12 text-center rounded-xl border border-slate-200 bg-white">
                <CreditCard size={36} className="mx-auto mb-3 text-slate-300" />
                <p className="font-semibold text-slate-900">No tienes tarjetas guardadas</p>
                <p className="text-sm text-slate-500 mt-1">
                    Al pagar con tarjeta, puedes guardarla para futuros cobros.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="grid gap-4 sm:grid-cols-2">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="relative rounded-xl border border-slate-200 bg-white p-5 flex flex-col gap-3"
                    >
                        {card.isDefault && (
                            <span className="absolute top-3 right-3 flex items-center gap-1 text-xs font-semibold text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 rounded-full px-2 py-0.5">
                                <Star size={10} fill="currentColor" /> Predeterminada
                            </span>
                        )}

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">
                                {brandIcon[card.cardBrand] ?? card.cardBrand.slice(0, 2)}
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900 leading-none">
                                    •••• {card.lastFour}
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5">{card.cardHolder}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">
                                Vence {card.expMonth}/{card.expYear}
                            </span>
                            <button
                                onClick={() => setConfirmId(card.id)}
                                disabled={remove.isPending}
                                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                            >
                                <Trash2 size={13} /> Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de confirmación de eliminación */}
            {confirmId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmId(null)} />
                    <div className="relative w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">¿Eliminar tarjeta?</h3>
                        <p className="text-sm text-slate-600 mb-6">
                            Esta tarjeta se eliminará permanentemente y no podrá usarse para cobros futuros.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setConfirmId(null)}
                                className="flex-1 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-sm font-medium transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => remove.mutate(confirmId)}
                                disabled={remove.isPending}
                                className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors disabled:opacity-60"
                            >
                                {remove.isPending ? 'Eliminando…' : 'Sí, eliminar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

