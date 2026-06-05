import { apiClient } from './apiClient.ts';
import type { Order, PaginatedResponse } from '../../types';

interface CreateOrderPayload {
    items: { variantId: string; quantity: number; unitPrice: number }[];
    shippingAddressId?: string;
}

interface ConfirmPaymentPayload {
    paymentMethodId: string;
    paymentConfirmationUrl?: string;
}

interface ApiOrdersResponse {
    orders: Order[];
    pagination: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
    };
}

/**
 * Servicio de pedidos para el cliente de la tienda.
 */
export const orderService = {
    /** Crea un nuevo pedido. POST /api/orders */
    create: async (payload: CreateOrderPayload): Promise<Order> => {
        const response = await apiClient.post<{ order: Order }>('/api/orders', payload);
        return response.data.order;
    },

    /** Obtiene el detalle de un pedido del cliente. GET /api/orders/:id */
    getById: async (orderId: string): Promise<Order> => {
        const response = await apiClient.get<{ order: Order }>(`/api/orders/${orderId}`);
        return response.data.order;
    },

    /** Lista todos los pedidos del cliente con paginación. GET /api/orders */
    listOrders: async (page = 1, pageSize = 20): Promise<PaginatedResponse<Order>> => {
        const response = await apiClient.get<ApiOrdersResponse>('/api/orders', {
            params: { page, pageSize },
        });
        return {
            data: response.data.orders,
            pageCount: response.data.pagination.totalPages,
        };
    },

    /** Lista todos los pedidos del cliente (sin paginación). GET /api/orders */
    listForCustomer: async (): Promise<Order[]> => {
        const response = await apiClient.get<ApiOrdersResponse>('/api/orders', {
            params: { pageSize: 100 },
        });
        return response.data.orders;
    },

    /**
     * Notifica al admin que se realizó el pago.
     * POST /api/orders/:orderId/confirm-payment
     */
    confirmPayment: async (
        orderId: string,
        payload: ConfirmPaymentPayload
    ): Promise<{ success: boolean; message: string }> => {
        const response = await apiClient.post(
            `/api/orders/${orderId}/confirm-payment`,
            payload
        );
        return response.data;
    },
};

