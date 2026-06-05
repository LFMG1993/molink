import type { Product } from './index';

export interface EmprendePostProduct {
    productId: string;
    product: Product;
}

export interface EmprendePost {
    id: string;
    title: string;
    description: string | null;
    youtubeUrl: string;
    createdAt: string;
    updatedAt: string;
    products: EmprendePostProduct[];
}

export type EmprendePostCreationData = Omit<EmprendePost, 'id' | 'createdAt' | 'updatedAt' | 'products'> & {
    productIds: string[];
};

export type EmprendePostUpdateData = Partial<EmprendePostCreationData>;