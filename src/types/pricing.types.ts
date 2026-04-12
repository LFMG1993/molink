export interface PricingPackage {
    id: string;
    name: string;
    nameEn: string;
    price: number;
    priceLabel: string;
    priceLabelEn: string;
    description: string;
    descriptionEn: string;
    features: string[];
    featuresEn: string[];
    popular?: boolean;
    cta: string;
    ctaEn: string;
    whatsappMessage: string;
    whatsappMessageEn: string;
}

export interface SubscriptionPlan {
    id: string;
    name: string;
    nameEn: string;
    monthlyPrice: number;
    annualPrice: number;
    setupFee: number;
    description: string;
    descriptionEn: string;
    features: string[];
    featuresEn: string[];
    popular?: boolean;
    included: string[];
    includedEn: string[];
    cta: string;
    ctaEn: string;
    whatsappMessage: string;
    whatsappMessageEn: string;
}

export interface PricingAddon {
    id: string;
    name: string;
    nameEn: string;
    price: number;
}