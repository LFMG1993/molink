import { formatCopFromCents, formatUsd } from '../../utils/currency';
import { calcularPrecioConDescuento, calcularDescuentoEnCentavos } from '../../utils/coupon';
import type { WompiPlanSummary, WompiBillingCycle, CouponInfo } from '../../types';

interface PriceSummaryProps {
    planSummary: WompiPlanSummary;
    billingCycle: WompiBillingCycle;
    couponInfo?: CouponInfo | null;
}

/**
 * Bloque de resumen de precio para el paso de pago del checkout.
 *
 * Muestra:
 *  - Setup fee (o "GRATIS" si es ciclo anual)
 *  - Primer período
 *  - Descuento del cupón (si aplica) con precio original tachado
 *  - Total final en USD y equivalente COP
 *  - TRM vigente
 *  - Nota de renovación futura
 */
export function PriceSummary({ planSummary, billingCycle, couponInfo }: PriceSummaryProps) {
    const isAnnual = billingCycle === 'annual';

    // Centavos base (antes de descuento)
    const baseAmountCents = isAnnual
        ? planSummary.amount_in_cents
        : planSummary.initial_charge_cents;

    // Centavos finales (con o sin descuento)
    const finalAmountCents = couponInfo
        ? calcularPrecioConDescuento(
            baseAmountCents,
            couponInfo.discountType,
            couponInfo.discountValue,
        )
        : baseAmountCents;

    const discountCents = couponInfo
        ? calcularDescuentoEnCentavos(baseAmountCents, couponInfo.discountType, couponInfo.discountValue)
        : 0;

    // USD display
    const displaySetupFee = isAnnual ? 0 : planSummary.setup_fee_usd;
    const displayTotalUsd = isAnnual ? planSummary.price_usd : planSummary.price_usd + planSummary.setup_fee_usd;

    // USD final con descuento (para mostrar cuando hay cupón)
    const finalUsd = couponInfo && discountCents > 0
        ? couponInfo.discountType === 'PERCENTAGE'
            ? displayTotalUsd * (1 - parseFloat(couponInfo.discountValue) / 100)
            : (finalAmountCents / 100) / planSummary.trm.rate
        : displayTotalUsd;

    // TRM
    const today = new Date().toISOString().slice(0, 10);
    const trmIsStale = planSummary.trm.valid_from !== today;

    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
            <p className="text-white/50 text-xs uppercase tracking-wider font-bold mb-3">
                Resumen del cobro
            </p>

            {/* Setup fee */}
            <div className="flex justify-between text-sm">
                <span className="text-white/60">Setup fee (único)</span>
                {isAnnual
                    ? <span className="text-green-400 font-semibold">¡GRATIS!</span>
                    : <span className="text-white">{formatUsd(displaySetupFee)}</span>
                }
            </div>

            {/* Período */}
            <div className="flex justify-between text-sm">
                <span className="text-white/60">{isAnnual ? 'Primer año' : 'Primer mes'}</span>
                <span className="text-white">{formatUsd(planSummary.price_usd)}</span>
            </div>

            {/* Descuento del cupón */}
            {couponInfo && discountCents > 0 && (
                <div className="flex justify-between text-sm">
                    <span className="text-green-400">
                        Cupón {couponInfo.code}
                        {couponInfo.discountType === 'PERCENTAGE'
                            ? ` (-${parseFloat(couponInfo.discountValue)}%)`
                            : ''}
                    </span>
                    <span className="text-green-400 font-semibold">
                        -{formatCopFromCents(discountCents)}
                    </span>
                </div>
            )}

            {/* Separador y total */}
            <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
                <span className="text-white">Total hoy</span>
                <div className="text-right">
                    {/* Precio original tachado si hay descuento */}
                    {couponInfo && discountCents > 0 && (
                        <p className="text-white/30 text-xs line-through font-normal">
                            {formatUsd(displayTotalUsd)}
                        </p>
                    )}
                    {/* Precio final en USD (primario) */}
                    <p className="text-white font-bold">
                        {formatUsd(finalUsd)}
                    </p>
                    {/* COP equivalente */}
                    {couponInfo && discountCents > 0 ? (
                        <p className="text-white/40 text-xs font-normal">
                            ≈ {formatCopFromCents(finalAmountCents)}
                        </p>
                    ) : baseAmountCents > 0 ? (
                        <p className="text-white/30 text-xs font-normal">
                            ≈ {formatCopFromCents(baseAmountCents)}
                        </p>
                    ) : null}
                    <p className={`text-xs ${trmIsStale ? 'text-yellow-500/60' : 'text-white/20'}`}>
                        TRM: ${planSummary.trm.rate.toFixed(2)}
                        {trmIsStale && ` (vigente: ${planSummary.trm.valid_from})`}
                    </p>
                </div>
            </div>

            {/* Trial */}
            {planSummary.trial_days > 0 && (
                <p className="text-green-400 text-xs">
                    ✓ {planSummary.trial_days} días de prueba gratis
                </p>
            )}

            {/* Nota renovación */}
            <p className="text-white/25 text-xs pt-1 border-t border-white/5">
                {isAnnual
                    ? `Renovación anual: ${formatUsd(planSummary.price_usd)}/año`
                    : `Desde el mes 2: ${formatUsd(planSummary.price_usd)}/mes`
                }
            </p>
        </div>
    );
}
