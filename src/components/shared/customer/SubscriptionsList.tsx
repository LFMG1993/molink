import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wompiService } from '../../../services/shared/wompiService.ts';
import { Spinner } from '../Spinner.tsx';
import { RefreshCw, X } from 'lucide-react';
import type { WompiSubscription } from '../../../types';

const statusLabel: Record<string, string> = {
    ACTIVE: 'Activa',
    INACTIVE: 'Inactiva',
    CANCELLED: 'Cancelada',
    PAUSED: 'Pausada',
    PAST_DUE: 'Vencida',
};

const statusColor: Record<string, string> = {
    ACTIVE: 'bg-green-500/15 text-green-600 border border-green-500/30',
    INACTIVE: 'bg-slate-500/15 text-slate-600 border border-slate-500/30',
    CANCELLED: 'bg-red-500/15 text-red-600 border border-red-500/30',
    PAUSED: 'bg-red-500/15 text-red-600 border border-red-500/30',
    PAST_DUE: 'bg-red-500/15 text-red-600 border border-red-500/30',
};

const cycleLabel: Record<string, string> = {
    monthly: 'Mensual',
    annual: 'Anual',
};

function formatDate(dateStr?: string) {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('es-CO', {
        year: 'numeric', month: 'long', day: 'numeric',
    });
}

export function SubscriptionsList() {
    const qc = useQueryClient();
    const [confirmId, setConfirmId] = useState<string | null>(null);

    const { data: subs = [], isLoading, isError } = useQuery<WompiSubscription[]>({
        queryKey: ['subscriptions'],
        queryFn: () => wompiService.getSubscriptions(),
    });

    const cancel = useMutation({
        mutationFn: (id: string) => wompiService.cancelSubscription(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['subscriptions'] });
            setConfirmId(null);
        },
    });

    if (isLoading) return <div className="flex justify-center py-16"><Spinner /></div>;

    if (isError) {
        return (
            <div className="py-8 text-center text-red-400 bg-red-500/10 rounded-xl border border-red-500/20">
                No pudimos cargar tus suscripciones. Intenta más tarde.
            </div>
        );
    }

    if (subs.length === 0) {
        return (
            <div className="py-12 text-center rounded-xl border border-slate-200 bg-white">
                <RefreshCw size={36} className="mx-auto mb-3 text-slate-300" />
                <p className="font-semibold text-slate-900">No tienes suscripciones activas</p>
                <p className="text-sm text-slate-500 mt-1">
                    Cuando adquieras un plan, aparecerá aquí.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-4">
                {subs.map((sub, index) => (
                    <div
                        key={sub.id || index}
                        className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                    >
                        <div className="flex-1 space-y-1.5">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-slate-900">
                                    {sub.plan?.name ?? 'Plan'}
                                </span>
                                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusColor[sub.status] ?? statusColor.INACTIVE}`}>
                                    {statusLabel[sub.status] ?? sub.status} - {cycleLabel[sub.billing_cycle] ?? sub.billing_cycle}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                                <span>
                                    Periodo actual hasta:{' '}
                                    <strong className="text-slate-900/80">{formatDate(sub.current_period_end)}</strong>
                                </span>
                                <span>
                                    Próxima factura:{' '}
                                    <strong className="text-slate-900/80">{formatDate(sub.next_billing_date)}</strong>
                                </span>
                            </div>
                        </div>

                        {sub.status === 'ACTIVE' && (
                            <button
                                onClick={() => setConfirmId(sub.id)}
                                disabled={cancel.isPending}
                                className="shrink-0 flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-400/50 rounded-lg px-3 py-1.5 transition-colors disabled:opacity-50"
                            >
                                <X size={14} /> Cancelar
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal de confirmación de cancelación */}
            {confirmId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmId(null)} />
                    <div className="relative w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">¿Cancelar suscripción?</h3>
                        <p className="text-sm text-slate-600 mb-6">
                            Tu acceso continuará hasta el final del período actual. Esta acción no tiene vuelta atrás.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setConfirmId(null)}
                                className="flex-1 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-sm font-medium transition-colors"
                            >
                                Mantener
                            </button>
                            <button
                                onClick={() => cancel.mutate(confirmId)}
                                disabled={cancel.isPending}
                                className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors disabled:opacity-60"
                            >
                                {cancel.isPending ? 'Cancelando…' : 'Sí, cancelar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

