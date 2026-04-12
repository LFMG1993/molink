export interface Product2 {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating: number;
    reviews: number;
    category: 'os' | 'office' | 'security' | 'design';
    image: string;
    tags: ('bestseller' | 'new' | 'flash')[];
    deliveryTime: string;
    brandLogo?: string;
}

export interface VolumeDiscount {
    id?: string;
    minQuantity: number;
    price: number; // número real
}

export interface ProductVariant {
    id?: string;             // presente en detalle, ausente en listado
    sku?: string;
    price: number;
    stock?: number;
    salePrice?: number | null;
    imageUrl?: string | null;
    isActive?: boolean;
    unitOfMeasure?: string | null;
    unitsPerItem?: number | null;
    volumeDiscounts: VolumeDiscount[];
    variantValues?: {
        attributeValue: {
            id: string;
            value: string;
            attributeId: string;
            attribute: {
                id: string;
                name: string;
            };
        };
    }[];
}

export interface Product {
    id: string;
    name: string;
    description?: string | null;
    isFeatured: boolean;
    isActive: boolean;
    imageUrl: string | null;
    sourceUrl?: string | null;
    sourceId?: string | null;
    providerId?: string | null;
    createdAt?: string;
    updatedAt?: string;
    category: {
        id: string;
        name: string;
        description?: string | null;
        parentId?: string | null;
        imageUrl?: string | null;
        createdAt?: string;
        updatedAt?: string;
        children?: Product['category'][];
    } | null;
    variants: ProductVariant[];
}

export interface ProductCreationData {
    name: string;
    description?: string;
    categoryId: string;
    isFeatured?: boolean;
    isActive?: boolean;
    imageUrl?: string | null;
    variants: {
        id?: string;
        sku: string;
        price: number;
        stock: number;
        salePrice?: number | null;
        imageUrl?: string | null;
        isActive?: boolean;
        unitOfMeasure?: string | null;
        unitsPerItem?: number | null;
        volumeDiscounts?: { minQuantity: number; price: number }[];
        attributeValueIds: string[];
    }[];
}

export type ProductUpdateData = Partial<ProductCreationData>;