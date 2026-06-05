import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WompiBillingCycle } from '../types';
import type { CouponInfo } from '../types';

// ─── Estado ───────────────────────────────────────────────────────────────────

interface CheckoutState {
    planId: string | null;
    billingCycle: WompiBillingCycle | null;
    couponCode: string | null;
    couponInfo: CouponInfo | null;
}

// ─── Acciones ─────────────────────────────────────────────────────────────────

interface CheckoutActions {
    setCheckout: (planId: string, billingCycle: WompiBillingCycle) => void;
    setCoupon: (code: string, info: CouponInfo) => void;
    clearCoupon: () => void;
    clear: () => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

/**
 * Store de Zustand que persiste el estado del checkout en sessionStorage.
 * Permite sobrevivir un reload entre el paso OTP y el paso de pago sin
 * perder el plan seleccionado ni el cupón aplicado.
 */
export const useCheckoutStore = create<CheckoutState & CheckoutActions>()(
    persist(
        (set) => ({
            planId: null,
            billingCycle: null,
            couponCode: null,
            couponInfo: null,

            setCheckout: (planId, billingCycle) =>
                set({ planId, billingCycle }),

            setCoupon: (code, info) =>
                set({ couponCode: code, couponInfo: info }),

            clearCoupon: () =>
                set({ couponCode: null, couponInfo: null }),

            clear: () =>
                set({ planId: null, billingCycle: null, couponCode: null, couponInfo: null }),
        }),
        {
            name: 'molink-checkout',
            storage: {
                getItem: (key) => {
                    const value = sessionStorage.getItem(key);
                    return value ? JSON.parse(value) : null;
                },
                setItem: (key, value) => sessionStorage.setItem(key, JSON.stringify(value)),
                removeItem: (key) => sessionStorage.removeItem(key),
            },
        },
    ),
);
