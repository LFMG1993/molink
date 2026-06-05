import { apiPublic } from './apiPublic.ts';
import { apiClient } from '../store/apiClient.ts';
import type {
    WompiPlan,
    WompiTrmRate,
    WompiCheckoutInitiateInput,
    WompiCheckoutInitiateResponse,
    WompiSubscribeInput,
    WompiSubscribeWithSourceInput,
    WompiCheckoutSubscribeResponse,
    WompiTransactionStatusResponse,
    WompiPaymentSource,
    WompiSubscription,
    WompiTransactionResult,
    CouponInfo,
    ValidateCouponInput,
} from '../../types';

/** Desempaqueta respuestas del API */
function unwrap<T>(responseData: unknown): T {
    if (
        responseData !== null &&
        typeof responseData === 'object' &&
        'success' in responseData &&
        'data' in responseData
    ) {
        return (responseData as { data: T }).data;
    }
    return responseData as T;
}

/** Normaliza una fuente de pago a camelCase */
function normalizePaymentSource(raw: unknown): WompiPaymentSource {
    const r = raw as Record<string, unknown>;
    return {
        id: (r.id as string) ?? '',
        wompiSourceId: Number(r.wompiSourceId ?? r.wompi_source_id ?? 0),
        lastFour: String(r.lastFour ?? r.last_four ?? ''),
        cardBrand: String(r.cardBrand ?? r.card_brand ?? ''),
        cardHolder: String(r.cardHolder ?? r.card_holder ?? ''),
        expMonth: String(r.expMonth ?? r.exp_month ?? ''),
        expYear: String(r.expYear ?? r.exp_year ?? ''),
        isDefault: Boolean(r.isDefault ?? r.is_default ?? false),
        createdAt: String(r.createdAt ?? r.created_at ?? ''),
    };
}

/** Servicio Wompi */
export const wompiService = {

    // Públicos
    getPlans: async (): Promise<WompiPlan[]> => {
        const response = await apiPublic.get('/api/wompi/plans');
        const result = unwrap<WompiPlan[]>(response.data);
        return Array.isArray(result) ? result : [];
    },

    getTrm: async (): Promise<WompiTrmRate> => {
        const response = await apiPublic.get('/api/trm/current');
        return unwrap<WompiTrmRate>(response.data);
    },

    /** Genera la URL de checkout de Wompi para una orden de la tienda */
    generatePaymentLink: async (body: {
        order_id: string;
        amount_in_cents: number;
        name: string;
        description: string;
        redirect_url: string;
    }): Promise<{ checkout_url: string }> => {
        const response = await apiClient.post('/api/wompi/payment-links', body);
        return unwrap<{ checkout_url: string }>(response.data);
    },

    initiateCheckout: async (body: WompiCheckoutInitiateInput): Promise<WompiCheckoutInitiateResponse> => {
        const response = await apiPublic.post('/api/wompi/checkout/initiate', body);
        return unwrap<WompiCheckoutInitiateResponse>(response.data);
    },

     // Valida un código de cupón
    validateCoupon: async (body: ValidateCouponInput): Promise<CouponInfo> => {
        const response = await apiPublic.post('/api/coupons/validate', body);
        return unwrap<CouponInfo>(response.data);
    },

     // Suscribe al usuario a un plan.
    subscribe: async (body: WompiSubscribeInput): Promise<WompiCheckoutSubscribeResponse> => {
        const response = await apiPublic.post('/api/wompi/checkout/subscribe', body);
        return unwrap<WompiCheckoutSubscribeResponse>(response.data);
    },

     // Paga con fuente guardada.
    subscribeWithSource: async (body: WompiSubscribeWithSourceInput): Promise<WompiCheckoutSubscribeResponse> => {
        const response = await apiPublic.post('/api/customer/wompi/checkout/subscribe', body);
        return unwrap<WompiCheckoutSubscribeResponse>(response.data);
    },

    getTransactionStatus: async (wompiId: string): Promise<WompiTransactionStatusResponse> => {
        const response = await apiPublic.get(`/api/wompi/transactions/${wompiId}/status`);
        return unwrap<WompiTransactionStatusResponse>(response.data);
    },

    getPaymentSources: async (): Promise<WompiPaymentSource[]> => {
        const endpoints = [
            '/api/wompi/payment-sources',
            '/api/customer/wompi/payment-sources',
        ];

        for (const endpoint of endpoints) {
            try {
                const response = await apiPublic.get(endpoint);
                const raw = unwrap<unknown>(response.data);

                if (
                    raw !== null &&
                    typeof raw === 'object' &&
                    !Array.isArray(raw) &&
                    'success' in raw &&
                    !(raw as { success: boolean }).success
                ) {
                    console.warn(`[wompi] ${endpoint} → success:false, probando siguiente endpoint`);
                    continue;
                }

                if (raw != null && Array.isArray(raw)) {
                    return raw.map(normalizePaymentSource);
                }
            } catch (e) {
                console.warn(`[wompi] ${endpoint} falló:`, e);
            }
        }

        return [];
    },

    getSubscriptions: async (): Promise<WompiSubscription[]> => {
        const response = await apiPublic.get('/api/wompi/subscriptions');
        const result = unwrap<any[]>(response.data);
        if (!Array.isArray(result)) return [];

        return result.map(item => {
            const sub = item.subscription || item;
            const plan = item.plan || sub.plan;
            
            return {
                id: sub.id,
                status: sub.status?.toUpperCase() || '',
                billing_cycle: sub.billingCycle || sub.billing_cycle,
                current_period_end: sub.currentPeriodEnd || sub.current_period_end,
                next_billing_date: sub.nextBillingDate || sub.next_billing_date,
                created_at: sub.createdAt || sub.created_at,
                amount_in_cents: sub.amountInCents || sub.amount_in_cents,
                plan: plan ? {
                    id: plan.id,
                    name: plan.name,
                    slug: plan.slug,
                    priceUsd: plan.priceUsd || plan.price_usd
                } : undefined
            };
        });
    },

    cancelSubscription: async (subscriptionId: string): Promise<void> => {
        await apiPublic.delete(`/api/wompi/subscriptions/${subscriptionId}`);
    },

    getTransactions: async (): Promise<WompiTransactionResult[]> => {
        const response = await apiPublic.get('/api/wompi/transactions');
        const result = unwrap<WompiTransactionResult[]>(response.data);
        return Array.isArray(result) ? result : [];
    },

    deletePaymentSource: async (sourceId: string): Promise<void> => {
        await apiPublic.delete(`/api/customer/wompi/payment-sources/${sourceId}`);
    },
};