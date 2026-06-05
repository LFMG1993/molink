import type {Product, ProductVariant} from "./product.types.ts";
import type {Address} from "./adress.types.ts";

export type PaymentStatus =
    'pending_payment'
    | 'pending_confirmation'
    | 'paid'
    | 'refunded'
    | 'cancelled'

export type ShippingStatus =
    'unfulfilled'
    | 'processing'
    | 'shipped'
    | 'delivered';

export type ShippingMethod = 'local_delivery' | 'national_shipping';

export interface PaymentMethod {
    id: string;
    name: string;
    qrCodeUrl: string | null;
    instructions?: string | null;
    isActive: boolean;
}

export interface Shipment {
    id: string;
    orderId: string;
    shippingMethod: ShippingMethod;
    company?: string | null;
    trackingNumber?: string | null;
    trackingUrl?: string | null;
    driverName?: string | null;
    licensePlate?: string | null;
    createdAt: string;
    order: {
        shippingStatus: ShippingStatus;
    };
}


export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
    // Relaciones que vienen del backend
    product: Product;
    variant: ProductVariant | null;
}

export interface Order {
    id: string;
    userId: string;
    paymentStatus: PaymentStatus;
    shippingStatus: ShippingStatus;
    total: number;
    paymentMethodId?: string | null;
    paymentConfirmationUrl?: string | null;
    createdAt: string;
    updatedAt?: string | null;
    user: { id: string; nombre: string; email: string; };
    items: OrderItem[];
    paymentMethod?: PaymentMethod | null;
    shipment?: Shipment | null;
    shippingAddress?: Address | null;
}

export type ShipmentFormData = {
    shippingMethod: ShippingMethod;
    company: string;
    trackingNumber: string;
    trackingUrl: string;
    driverName: string;
    licensePlate: string;
};

export type PaymentMethodCreationData = Omit<PaymentMethod, 'id'>;
export type PaymentMethodUpdateData = Partial<PaymentMethodCreationData>;
export type ShipmentCreationData = ShipmentFormData;
export type ShipmentUpdateData = Partial<ShipmentFormData>;

export const PaymentStatusLabels: Record<PaymentStatus, string> = {
    pending_payment: "Pendiente de pago",
    pending_confirmation: "Pendiente de confirmación",
    paid: "Pagado",
    refunded: "Reembolsado",
    cancelled: "Cancelado"
};

export const ShippingStatusLabels: Record<ShippingStatus, string> = {
    unfulfilled: "Por preparar",
    processing: "Procesando",
    shipped: "Enviado",
    delivered: "Entregado"
};

export const ShippingMethodLabels: Record<ShippingMethod, string> = {
    local_delivery: "Domicilio",
    national_shipping: "Envío Nacional"
};


export const PaymentStatusColors: Record<PaymentStatus, string> = {
    pending_payment: "text-yellow-600 bg-yellow-100",
    pending_confirmation: "text-blue-600 bg-blue-100",
    paid: "text-green-700 bg-green-100",
    refunded: "text-gray-600 bg-gray-100",
    cancelled: "text-red-700 bg-red-100"
};

export const ShippingStatusColors: Record<ShippingStatus, string> = {
    unfulfilled: "text-gray-600 bg-gray-100",
    processing: "text-indigo-600 bg-indigo-100",
    shipped: "text-cyan-700 bg-cyan-100",
    delivered: "text-green-700 bg-green-100"
}