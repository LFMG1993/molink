/**
 * Tipos para el flujo de paquetes de pago único (one-time payments).
 */

export interface ServicePackage {
    id: string;
    slug: string;
    name: string;
    nameEn: string | null;
    description: string | null;
    descriptionEn: string | null;
    priceUsd: string;
    features: string[] | null;
    featuresEn: string[] | null;
    deliveryDaysMin: number;
    deliveryDaysMax: number;
    supportDays: number;
    sortOrder: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

/** Paquete con precio COP ya calculado */
export interface PackageWithPrice extends ServicePackage {
    amountInCents: number;
    trm: {
        rate: number;
        valid_from: string;
    };
}

export type PackageOrderStatus = 'pending' | 'paid' | 'refunded' | 'cancelled';

export interface PackageOrder {
    id: string;
    userId: string | null;
    packageId: string;
    couponId: string | null;
    wompiTransactionId: string | null;
    status: PackageOrderStatus;
    amountPaidCents: number;
    amountPaidUsd: string | null;
    trmRate: string | null;
    requirements: string | null;
    adminNotes: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface PackagePaymentSource {
    id: string;
    wompiSourceId: number;
    lastFour: string;
    cardBrand: string;
    cardHolder: string | null;
    expMonth: string;
    expYear: string;
    isDefault: boolean;
}

// Estado de transacción Wompi
export type PackageWompiStatus = 'PENDING' | 'APPROVED' | 'DECLINED' | 'VOIDED' | 'ERROR';

export interface PackageCheckoutInitiateResponse {
    message: string;
    email: string;
}

export interface PackagePayResponse {
    package_order: PackageOrder;
    payment_source?: PackagePaymentSource;
    wompi_transaction_id: string;
    wompi_status: PackageWompiStatus;
}

// Cuerpos de request
export interface CheckoutInitiatePackageBody {
    package_id: string;
    email: string;
    name: string;
    coupon_code?: string;
    requirements?: string;
}

export interface CheckoutPayPackageBody {
    package_id: string;
    card_number: string;
    cvc: string;
    exp_month: string;
    exp_year: string;
    card_holder: string;
    coupon_code?: string;
    requirements?: string;
    installments?: number;
}

export interface PackagePayWithSourceBody {
    package_id: string;
    payment_source_id: number;
    coupon_code?: string;
    requirements?: string;
    installments?: number;
}

export type PackagePollResult = 'paid' | 'cancelled' | 'timeout';
