import type { CouponDiscountType } from '../types';

// ─── Cálculo de precio con descuento ──────────────────────────────────────────

/**
 * Calcula el monto final en centavos COP después de aplicar el descuento del cupón.
 *
 * - PERCENTAGE: `discountValue` es el porcentaje (ej. "20" → 20% de descuento)
 * - FIXED_AMOUNT: `discountValue` es el descuento en centavos COP (ej. "5000000" → $50.000 COP)
 *
 * Siempre devuelve un valor >= 0.
 */
export function calcularPrecioConDescuento(
    amountInCents: number,
    discountType: CouponDiscountType,
    discountValue: string,
): number {
    const val = parseFloat(discountValue);
    if (isNaN(val) || val <= 0) return amountInCents;

    if (discountType === 'PERCENTAGE') {
        const descuento = amountInCents * (val / 100);
        return Math.max(0, Math.round(amountInCents - descuento));
    }

    if (discountType === 'FIXED_AMOUNT') {
        return Math.max(0, Math.round(amountInCents - val));
    }

    return amountInCents;
}

/**
 * Devuelve el monto de descuento en centavos (para mostrarlo en la UI).
 */
export function calcularDescuentoEnCentavos(
    amountInCents: number,
    discountType: CouponDiscountType,
    discountValue: string,
): number {
    return amountInCents - calcularPrecioConDescuento(amountInCents, discountType, discountValue);
}

/**
 * Formatea el valor del descuento para mostrarlo en el badge del cupón.
 * - PERCENTAGE → "-20%"
 * - FIXED_AMOUNT → "-$50.000 COP"
 */
export function formatearDescuentoCupon(
    discountType: CouponDiscountType,
    discountValue: string,
): string {
    const val = parseFloat(discountValue);
    if (discountType === 'PERCENTAGE') {
        return `-${val}%`;
    }
    const cop = Math.round(val / 100).toLocaleString('es-CO');
    return `-$${cop} COP`;
}
