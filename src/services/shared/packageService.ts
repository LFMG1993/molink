import { apiPublic } from './apiPublic.ts';
import type {
    PackageWithPrice,
    PackageOrder,
    PackagePayResponse,
    PackageCheckoutInitiateResponse,
    CheckoutInitiatePackageBody,
    CheckoutPayPackageBody,
    PackagePayWithSourceBody,
    PackagePollResult,
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

export const packageService = {

    // Públicos
    getPackages: async (): Promise<PackageWithPrice[]> => {
        const response = await apiPublic.get('/api/packages');
        const result = unwrap<PackageWithPrice[]>(response.data);
        return Array.isArray(result) ? result : [];
    },

     // Inicia el checkout: crea la cuenta (si no existe) y envía OTP al email.
    initiateCheckout: async (body: CheckoutInitiatePackageBody): Promise<PackageCheckoutInitiateResponse> => {
        const response = await apiPublic.post('/api/packages/checkout/initiate', body);
        return unwrap<PackageCheckoutInitiateResponse>(response.data);
    },

    /** Tokeniza la tarjeta y realiza el cobro del paquete. */
    pay: async (body: CheckoutPayPackageBody): Promise<PackagePayResponse> => {
        const response = await apiPublic.post('/api/packages/checkout/pay', body);
        return unwrap<PackagePayResponse>(response.data);
    },

    /** Paga usando una tarjeta ya guardada */
    payWithSource: async (body: PackagePayWithSourceBody): Promise<PackagePayResponse> => {
        const response = await apiPublic.post('/api/packages/pay', body);
        return unwrap<PackagePayResponse>(response.data);
    },

    /** Lista las órdenes del cliente autenticado. */
    getOrders: async (): Promise<PackageOrder[]> => {
        const response = await apiPublic.get('/api/package-orders');
        const result = unwrap<PackageOrder[]>(response.data);
        return Array.isArray(result) ? result : [];
    },

    /** Polling de estado de una orden hasta que sea 'paid', 'cancelled' o timeout. */
    pollOrderStatus: async (
        orderId: string,
        maxAttempts = 10,
    ): Promise<PackagePollResult> => {
        for (let i = 0; i < maxAttempts; i++) {
            await new Promise<void>(r => setTimeout(r, 3000));
            try {
                const orders = await packageService.getOrders();
                const order = orders.find(o => o.id === orderId);
                if (order?.status === 'paid') return 'paid';
                if (order?.status === 'cancelled') return 'cancelled';
            } catch {
            }
        }
        return 'timeout';
    },
};
