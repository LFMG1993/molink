import { useState } from 'react';
import { Tag, X, Loader2, CheckCircle2 } from 'lucide-react';
import { wompiService } from '../../services/shared/wompiService.ts';
import { formatearDescuentoCupon } from '../../utils/coupon.ts';
import type { CouponInfo } from '../../types';


interface CouponInputProps {
    planId?: string;
    onApplied: (info: CouponInfo) => void;
    onRemoved: () => void;
}

/**
 * Input de código de cupón con validación en vivo.
 *
 * Flujo:
 *  1. Usuario escribe código → hace clic en "Aplicar"
 *  2. Llama a POST /api/coupons/validate
 *  3a. Válido → muestra badge verde + llama onApplied
 *  3b. Inválido → muestra mensaje de error inline
 *  4. Usuario puede quitar el cupón con el botón ×
 */
export function CouponInput({ planId, onApplied, onRemoved }: CouponInputProps) {
    const [inputValue, setInputValue] = useState('');
    const [applied, setApplied] = useState<CouponInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleApply() {
        const code = inputValue.trim().toUpperCase();
        if (!code) return;

        setLoading(true);
        setError('');

        try {
            const info = await wompiService.validateCoupon({
                code,
                ...(planId ? { plan_id: planId } : {}),
            });
            setApplied(info);
            onApplied(info);
        } catch (err: unknown) {
            // El backend devuelve { success: false, error: "..." } con status 400
            const axiosErr = err as {
                response?: { data?: { error?: string } };
            };
            const msg =
                axiosErr.response?.data?.error ??
                'Cupón inválido. Verifica el código e intenta de nuevo.';
            setError(msg);
            setApplied(null);
        } finally {
            setLoading(false);
        }
    }

    function handleRemove() {
        setApplied(null);
        setInputValue('');
        setError('');
        onRemoved();
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleApply();
        }
    }

    // ── Cupón ya aplicado ─────────────────────────────────────────────────────
    if (applied) {
        return (
            <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-3">
                <div className="flex items-center gap-2.5 min-w-0">
                    <CheckCircle2 size={16} className="text-green-400 shrink-0" />
                    <div className="min-w-0">
                        <p className="text-green-400 text-sm font-bold leading-none">
                            {applied.code}
                            <span className="ml-2 font-normal opacity-80">
                                {formatearDescuentoCupon(applied.discountType, applied.discountValue)}
                            </span>
                        </p>
                        {applied.description && (
                            <p className="text-green-300/60 text-xs mt-0.5 truncate">
                                {applied.description}
                            </p>
                        )}
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleRemove}
                    aria-label="Quitar cupón"
                    className="ml-3 text-green-400/60 hover:text-green-300 transition-colors shrink-0"
                >
                    <X size={16} />
                </button>
            </div>
        );
    }

    // ── Input ─────────────────────────────────────────────────────────────────
    return (
        <div className="space-y-1.5">
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Tag size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                        id="coupon-code-input"
                        type="text"
                        placeholder="Código de cupón"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value.toUpperCase());
                            if (error) setError('');
                        }}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#f30519]/60 transition-all text-sm disabled:opacity-50"
                    />
                </div>
                <button
                    type="button"
                    id="coupon-apply-btn"
                    onClick={handleApply}
                    disabled={loading || !inputValue.trim()}
                    className="px-4 py-3 rounded-lg bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0"
                >
                    {loading ? <Loader2 size={15} className="animate-spin" /> : null}
                    Aplicar
                </button>
            </div>

            {error && (
                <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    {error}
                </p>
            )}
        </div>
    );
}
