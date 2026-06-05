import { useQuery } from '@tanstack/react-query';
import { wompiService } from '../../../services/shared/wompiService.ts';
import { Spinner } from '../Spinner.tsx';
import { Receipt } from 'lucide-react';
import type { WompiTransactionResult, WompiTransactionStatus } from '../../../types';

const statusLabel: Record<WompiTransactionStatus, string> = {
    APPROVED: 'Aprobado',
    PENDING: 'Pendiente',
    DECLINED: 'Declinado',
    ERROR: 'Error',
};

const statusColor: Record<WompiTransactionStatus, string> = {
    APPROVED: 'bg-green-500/15 text-green-400 border border-green-500/30',
    PENDING: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30',
    DECLINED: 'bg-red-500/15 text-red-400 border border-red-500/30',
    ERROR: 'bg-gray-500/15 text-gray-400 border border-gray-500/30',
};

function formatCop(cents: number) {
    return (cents / 100).toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0,
    });
}

export function TransactionHistory() {
    const { data: txs = [], isLoading, isError } = useQuery<WompiTransactionResult[]>({
        queryKey: ['transactions'],
        queryFn: () => wompiService.getTransactions(),
    });

    if (isLoading) return <div className="flex justify-center py-16"><Spinner /></div>;

    if (isError) {
        return (
            <div className="py-8 text-center text-red-400 bg-red-500/10 rounded-xl border border-red-500/20">
                No pudimos cargar el historial. Intenta más tarde.
            </div>
        );
    }

    if (txs.length === 0) {
        return (
            <div className="py-12 text-center rounded-xl border border-slate-200 bg-white">
                <Receipt size={36} className="mx-auto mb-3 text-slate-300" />
                <p className="font-semibold text-slate-900">Sin transacciones aún</p>
                <p className="text-sm text-slate-500 mt-1">
                    Tus pagos procesados con Wompi aparecerán aquí.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {txs.map((tx, idx) => {
                const txId = tx.wompi_transaction_id ?? tx.id ?? `tx-${idx}`;
                return (
                    <div
                        key={txId}
                        className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4"
                    >
                        <div className="flex-1">
                            <p className="text-xs text-slate-400 font-mono truncate">
                                #{txId}
                            </p>
                        </div>
                        <div className="flex items-center gap-4 sm:justify-end">
                            <span className="font-bold text-slate-900">
                                {formatCop(tx.amount_in_cents)}
                            </span>
                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusColor[tx.status]}`}>
                                {statusLabel[tx.status]}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

