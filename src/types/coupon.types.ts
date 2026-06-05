export type CouponDiscountType = 'PERCENTAGE' | 'FIXED_AMOUNT';

export interface CouponInfo {
    code: string;
    discountType: CouponDiscountType;
    discountValue: string;
    description: string | null;
}

export interface ValidateCouponInput {
    code: string;
    plan_id?: string;
}

export interface ValidateCouponResponse {
    success: boolean;
    data: CouponInfo;
}