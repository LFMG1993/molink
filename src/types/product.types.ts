export interface Product {
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