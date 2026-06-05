export type WompiBillingCycle = 'monthly' | 'annual';
export type WompiTransactionStatus = 'PENDING' | 'APPROVED' | 'DECLINED' | 'ERROR';
export type WompiCheckoutStep = 'details' | 'otp' | 'payment' | 'threeds' | 'polling' | 'success';

export interface WompiPlan {
    id: string;
    slug: string;
    name: string;
    description: string;
    priceUsd: string;
    annualPriceUsd: string | null;
    setupFeeUsd: string;
    features: string[];
    isActive: boolean;
    trialDays: number;
    billingInterval: 'MONTHLY' | 'YEARLY' | 'WEEKLY';
}

export interface WompiTrmRate {
    usdCopRate: number;
    validFrom: string;
    fetchedAt: string;
}

export interface WompiPlanSummary {
    id: string;
    name: string;
    billing_cycle: WompiBillingCycle;
    price_usd: number;
    setup_fee_usd: number;
    initial_charge_usd: number;
    amount_in_cents: number;
    setup_fee_cents: number;
    initial_charge_cents: number;
    currency: 'COP';
    trial_days: number;
    trm: {
        rate: number;
        valid_from: string;
    };
}

export interface WompiCheckoutInitiateResponse {
    emailMasked: string;
    planSummary: WompiPlanSummary;
}

export interface WompiPaymentSource {
    id: string;
    wompiSourceId: number;
    lastFour: string;
    cardBrand: string;
    cardHolder: string;
    expMonth: string;
    expYear: string;
    isDefault: boolean;
    createdAt?: string;
}

export interface WompiSubscribeWithSourceInput {
    plan_id: string;
    billing_cycle: WompiBillingCycle;
    /** wompiSourceId de la tarjeta guardada */
    payment_source_id: number;
    coupon_code?: string;
    installments?: number;
    redirect_url?: string;
}

export interface WompiSubscription {
    id: string;
    status: string;
    billing_cycle: WompiBillingCycle;
    current_period_end: string;
    next_billing_date: string;
    created_at?: string;
    amount_in_cents?: number;
    plan?: {
        id: string;
        name: string;
        slug?: string;
        priceUsd?: string;
    };
}

export interface WompiTransactionResult {
    wompi_transaction_id?: string;
    id?: string;
    status: WompiTransactionStatus;
    amount_in_cents: number;
    /** Presente solo en flujos 3DS. Puede ser null cuando el pago es asíncrono sin autenticación. */
    redirect_url?: string | null;
}

export interface WompiCheckoutSubscribeResponse {
    payment_source: WompiPaymentSource;
    subscription: WompiSubscription;
    transaction: WompiTransactionResult | null;
}

export interface WompiTransactionStatusResponse {
    status: WompiTransactionStatus;
}

export interface WompiCheckoutInitiateInput {
    email: string;
    name: string;
    plan_id: string;
    billing_cycle: WompiBillingCycle;
    coupon_code?: string;
}

export interface WompiSubscribeInput {
    plan_id: string;
    billing_cycle: WompiBillingCycle;
    card_number: string;
    cvc: string;
    exp_month: string;
    exp_year: string;
    card_holder: string;
    installments: number;
    redirect_url?: string;
    coupon_code?: string;
}

export interface WompiCardFormData {
    cardNumber: string;
    cardHolder: string;
    expMonth: string;
    expYear: string;
    cvc: string;
    installments: number;
}
